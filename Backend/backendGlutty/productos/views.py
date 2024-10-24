import random
from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .models import *
from .serializers import *
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector, TrigramSimilarity
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Producto, MarcaProducto, TipoProducto
from .serializers import ProductoSerializer, MarcaSerializer, TipoProductoSerializer
import time
from django.db.models import Q
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination
from django.db import connection

class MarcaViewSet(viewsets.ModelViewSet):
    queryset = MarcaProducto.objects.all()
    serializer_class = MarcaSerializer


class TipoProductoViewSet(viewsets.ModelViewSet):
    queryset = TipoProducto.objects.all()
    serializer_class = TipoProductoSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()  # Definir el queryset aquí

    def get_queryset(self):
        return self.queryset.filter(is_active=True)  # Filtrar el queryset

    # queryset = Producto.objects.all()
    # serializer_class = ProductoSerializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def find(request):
    try:
        query = request.data.get("q", None)
        marcas = request.data.get("marca", [])
        tipos = request.data.get("tipo", [])

        # Parámetros de paginación
        page_number = request.data.get("page", 1)
        page_size = request.data.get("page_size", 10)

        # Asegurarse de que marcas y tipos sean listas
        if isinstance(marcas, str):
            marcas = [marca.strip() for marca in marcas.split(",")]
        if isinstance(tipos, str):
            tipos = [tipo.strip() for tipo in tipos.split(",")]

        # Verificar si se proporcionaron al menos uno de los parámetros
        if not query and not marcas and not tipos:
            return Response(
                {"error": "No se proporcionó un parámetro de búsqueda."}, status=400
            )

        start_time_db = time.time()

        # Configurar la configuración de búsqueda en español
        spanish_config = "spanish"

        # Construir el filtro base con Q
        base_filter = Q()

        if query:
            base_filter &= (
                Q(nombre__icontains=query)
                | Q(denominacion__icontains=query)
                | Q(rnpa__icontains=query)
                | Q(search_vector__icontains=query)
            )

        # Filtros de marcas y tipos con OR
        marcas_filter = Q()
        tipos_filter = Q()

        if marcas:
            for marca in marcas:
                marcas_filter |= Q(marca__nombre__icontains=marca)

        if tipos:
            for tipo in tipos:
                tipos_filter |= Q(tipo__nombre__icontains=tipo)

        # Combinar todos los filtros con AND
        combined_filter = base_filter & marcas_filter & tipos_filter

        # Filtrar productos por coincidencias exactas o similares en el search_vector
        productos = (
            Producto.objects.annotate(
                rank=SearchVector(
                    "nombre",
                    "denominacion",
                    "rnpa",
                    "marca__nombre",
                    "tipo__nombre",
                    config=spanish_config,
                )
            )
            .filter(combined_filter, is_active=True)
            .order_by("-rank")
            .select_related("marca", "tipo")
            .values(
                "id", "rnpa", "nombre", "denominacion", "marca__nombre", "tipo__nombre"
            )
        )

        # Aplicar paginación
        paginator = Paginator(productos, page_size)
        paginated_productos = paginator.get_page(page_number)

        db_time = time.time() - start_time_db
        print(f"Tiempo en DB: {db_time:.4f} segundos")
        print(f"Productos encontrados: {paginator.count}")

        start_time_serialization = time.time()

        # Filtrar marcas y tipos de productos por nombre que contenga las letras buscadas
        marcas_query = Q()
        tipos_query = Q()

        if marcas:
            for marca in marcas:
                marcas_query |= Q(nombre__icontains=marca)
            marcas = MarcaProducto.objects.filter(marcas_query).distinct()
        else:
            marcas = (
                MarcaProducto.objects.filter(nombre__icontains=query).distinct()
                if query
                else MarcaProducto.objects.none()
            )

        if tipos:
            for tipo in tipos:
                tipos_query |= Q(nombre__icontains=tipo)
            tipos_productos = TipoProducto.objects.filter(tipos_query).distinct()
        else:
            tipos_productos = (
                TipoProducto.objects.filter(nombre__icontains=query).distinct()
                if query
                else TipoProducto.objects.none()
            )

        marcas_serializer = MarcaSerializer(marcas, many=True)
        tipos_productos_serializer = TipoProductoSerializer(tipos_productos, many=True)

        resultados = {
            "productos": list(paginated_productos),
            "marcas": marcas_serializer.data,
            "tipos_productos": tipos_productos_serializer.data,
        }

        serialization_time = time.time() - start_time_serialization
        print(f"Tiempo en serialización: {serialization_time:.4f} segundos")

        return Response(resultados, status=200)

    except Exception as e:
        print(f"Error: {str(e)}")
        return Response(
            {"error": "Ocurrió un error interno en el servidor."}, status=500
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def find_by_filtro(request):
    marca_nombre = request.data.get("marca", None)
    tipo_nombre = request.data.get("tipo", None)

    if marca_nombre and tipo_nombre:
        # Caso: Se especifica tanto marca como tipo
        productos = (
            Producto.objects.filter(
                marca__nombre__icontains=marca_nombre,
                tipo__nombre__icontains=tipo_nombre,
                is_active=True,
            )
            .select_related("marca", "tipo")
            .values(
                "id", "rnpa", "nombre", "denominacion", "marca__nombre", "tipo__nombre"
            )
        )
    elif marca_nombre:
        # Caso: Solo se especifica marca
        productos = (
            Producto.objects.filter(
                marca__nombre__icontains=marca_nombre, is_active=True
            )
            .select_related("marca", "tipo")
            .values(
                "id", "rnpa", "nombre", "denominacion", "marca__nombre", "tipo__nombre"
            )
        )
    elif tipo_nombre:
        # Caso: Solo se especifica tipo
        productos = (
            Producto.objects.filter(tipo__nombre__icontains=tipo_nombre, is_active=True)
            .select_related("marca", "tipo")
            .values(
                "id", "rnpa", "nombre", "denominacion", "marca__nombre", "tipo__nombre"
            )
        )
    else:
        return Response(
            {"error": "Debe proporcionar al menos un parámetro válido (marca o tipo)."},
            status=400,
        )

    # Preparar la respuesta JSON
    resultados = {
        "productos": productos,
    }

    return Response(resultados, status=200)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
# ESTA ES LA QUE YA FUNCIONA!!!! :))))))
def buscar(request):
    query = request.data.get("q", None)
    print(query)
    if query:
        productos = Producto.objects.filter(
            Q(nombre__icontains=query)
            | Q(denominacion__icontains=query)
            | Q(marca__nombre__icontains=query)
            | Q(tipo__nombre__icontains=query),
            is_active=True,
        ).values(
            "id", "rnpa", "marca__nombre", "tipo__nombre", "nombre", "denominacion"
        )
        print(f"Productos encontrados: {productos.count()}")

        marcas = MarcaProducto.objects.filter(nombre__icontains=query)
        tipos_productos = TipoProducto.objects.filter(nombre__icontains=query)

        marcas_serializer = MarcaSerializer(marcas, many=True)
        tipos_productos_serializer = TipoProductoSerializer(tipos_productos, many=True)

        resultados = {
            "productos": productos,
            "marcas": marcas_serializer.data,
            "tipos_productos": tipos_productos_serializer.data,
        }

        return Response(resultados, status=200)

    return Response(
        {"error": "No se proporcionó un parámetro de búsqueda."}, status=400
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def find_by_barcode(request):
    barcode = request.data.get("barcode", None)
    if barcode:
        try:
            # Buscar el producto por código EAN en ProductoBarcode
            producto_barcode = ProductoBarcode.objects.get(ean=barcode)
            rnpa = producto_barcode.rnpa

            # Buscar si el RNPA está registrado en Producto
            producto = Producto.objects.filter(rnpa=rnpa).first()

            # Indicador de si el producto es apto o no
            is_apt: bool
            product_name = ""
            product_brand = ""

            if producto:
                is_apt = True
                message = "Producto apto, confirmado por ANMAT"

                product_name = producto.nombre if producto else None
                product_brand = (
                    (producto.marca.nombre if producto and producto.marca else None),
                )
            else:
                is_apt = False
                message = "No podemos confirmar que este producto es apto"

                if producto_barcode.product_name_es != "nan":
                    product_name = producto_barcode.product_name_es
                else:
                    product_name = producto_barcode.product_name_en

                product_brand = producto_barcode.brands

            # Preparar la respuesta JSON
            response_data = {
                "is_apt": is_apt,
                "message": message,
                "producto": {
                    "id": producto.id if producto else None,
                    "rnpa": producto.rnpa if producto else None,
                    "marca_nombre": product_brand,
                    "tipo_nombre": (
                        producto.tipo.nombre if producto and producto.tipo else None
                    ),
                    "nombre": product_name,
                    "denominacion": producto.denominacion if producto else None,
                },
            }

            connection.close()
            return Response(response_data, status=200)

        except ProductoBarcode.DoesNotExist:
            connection.close()
            return Response(
                {"message": "No tenemos información sobre este producto."}, status=404
            )

        except Exception as e:
            connection.close()
            return Response({"error": str(e)}, status=500)
    else:
        return Response({"error": "No se proporcionó un código EAN."}, status=400)


# Carga una marca y un tipo de producto random inicial
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_initial_data(request):
    try:
        # Obtener todas las marcas y tipos de productos
        marcas = list(MarcaProducto.objects.all())
        tipos = list(TipoProducto.objects.all())
        
        # Verificar que haya datos disponibles en ambas tablas
        if not marcas or not tipos:
            return Response({"error": "No se encontraron marcas o tipos de productos."}, status=404)
        
        # Elegir un valor aleatorio de cada tabla
        marca_random = random.choice(marcas)
        tipo_random = random.choice(tipos)
        
        marcas.remove(marca_random)
        tipos.remove(tipo_random)
        
        marcas_array = random.sample(marcas, min(5, len(marcas)))
        tipos_array = random.sample(tipos, min(5, len(tipos)))
        
        # Preparar los arrays con nombres e IDs de marca y tipo
        marcas_datos = [{"id": marca.id, "nombre": marca.nombre} for marca in marcas_array]
        tipos_datos = [{"id": tipo.id, "nombre": tipo.nombre} for tipo in tipos_array]
        
        # Devolver los nombres de marca y tipo seleccionados
        connection.close()
        return Response({
            "marca": marca_random.nombre,
            "tipo": tipo_random.nombre,
            "marcas": marcas_datos,
            "tipos": tipos_datos
        }, status=200)
    
    except Exception as e:
        return Response({"error": f"Error inesperado: {str(e)}"}, status=500)