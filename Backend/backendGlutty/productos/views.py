from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .models import *
from .serializers import *
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector
from django.db.models import Q
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Producto, MarcaProducto, TipoProducto
from .serializers import ProductoSerializer, MarcaSerializer, TipoProductoSerializer
import time
from django.db.models import Q

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
    
# # Create your views here.
# class MarcaAPIView(generics.ListCreateAPIView):
#     queryset = MarcaProducto.objects.all()
#     serializer_class = MarcaSerializer

@api_view(["POST"])
def find(request):
    query = request.data.get('q', None)
    marcas = request.data.get('marca', [])
    tipos = request.data.get('tipo', [])

    # Asegurarse de que marcas y tipos sean listas
    if not isinstance(marcas, list):
        marcas = [marcas]
    if not isinstance(tipos, list):
        tipos = [tipos]

    if query:
        start_time_db = time.time()
        
        # Configurar la configuración de búsqueda en español
        spanish_config = 'spanish'
        
        # Construir la consulta de búsqueda
        search_query = SearchQuery(query, config=spanish_config)
        
        # Construir el filtro base
        filter_conditions = Q(
            Q(nombre__icontains=query) | Q(denominacion__icontains=query) | Q(rnpa__icontains=query) |
            Q(marca__nombre__icontains=query) | Q(tipo__nombre__icontains=query) |
            Q(search_vector=query) | Q(search_vector__icontains=query),
            is_active=True
        )
        
        # Agregar filtros adicionales para marcas y tipos
        if marcas:
            filter_conditions &= Q(marca__nombre__in=marcas)
        if tipos:
            filter_conditions &= Q(tipo__nombre__in=tipos)
        
        # Filtrar productos por coincidencias exactas o similares en el search_vector
        productos = Producto.objects.annotate(
            rank=SearchVector('nombre', 'denominacion', 'rnpa', 'marca__nombre', 'tipo__nombre', config=spanish_config)
        ).filter(filter_conditions).order_by('-rank').select_related('marca', 'tipo').values(
            'id', 'rnpa', 'nombre', 'denominacion', 'marca__nombre', 'tipo__nombre'
        )
        
        db_time = time.time() - start_time_db
        print(f"Tiempo en DB: {db_time:.4f} segundos")
        print(f"Productos encontrados: {productos.count()}")
        
        start_time_serialization = time.time()

        # Filtrar marcas y tipos de productos por nombre que contenga las letras buscadas
        marcas = MarcaProducto.objects.filter(nombre__icontains=query)
        tipos_productos = TipoProducto.objects.filter(nombre__icontains=query)

        marcas_serializer = MarcaSerializer(marcas, many=True)
        tipos_productos_serializer = TipoProductoSerializer(tipos_productos, many=True)

        resultados = {
            'productos': productos,
            'marcas': marcas_serializer.data,
            'tipos_productos': tipos_productos_serializer.data,
        }
        
        serialization_time = time.time() - start_time_serialization
        print(f"Tiempo en serialización: {serialization_time:.4f} segundos")

        return Response(resultados, status=200)

    return Response({"error": "No se proporcionó un parámetro de búsqueda."}, status=400)

@api_view(["POST"])
def find_by_filtro(request):
    marca_nombre = request.data.get('marca', None)
    tipo_nombre = request.data.get('tipo', None)

    if marca_nombre and tipo_nombre:
        # Caso: Se especifica tanto marca como tipo
        productos = Producto.objects.filter(
            marca__nombre__icontains=marca_nombre,
            tipo__nombre__icontains=tipo_nombre,
            is_active=True
        ).select_related('marca', 'tipo').values(
            'id', 'rnpa', 'nombre', 'denominacion', 'marca__nombre', 'tipo__nombre'
        )
    elif marca_nombre:
        # Caso: Solo se especifica marca
        productos = Producto.objects.filter(
            marca__nombre__icontains=marca_nombre,
            is_active=True
        ).select_related('marca', 'tipo').values(
            'id', 'rnpa', 'nombre', 'denominacion', 'marca__nombre', 'tipo__nombre'
        )
    elif tipo_nombre:
        # Caso: Solo se especifica tipo
        productos = Producto.objects.filter(
            tipo__nombre__icontains=tipo_nombre,
            is_active=True
        ).select_related('marca', 'tipo').values(
            'id', 'rnpa', 'nombre', 'denominacion', 'marca__nombre', 'tipo__nombre'
        )
    else:
        return Response({"error": "Debe proporcionar al menos un parámetro válido (marca o tipo)."}, status=400)
    
    # Preparar la respuesta JSON
    resultados = {
        'productos': productos,
    }

    return Response(resultados, status=200)


@api_view(["POST"])
# ESTA ES LA QUE YA FUNCIONA!!!! :))))))
def buscar(request):
    query = request.data.get('q', None)
    print(query)
    if query:
        productos = Producto.objects.filter(
            Q(nombre__icontains=query) |
            Q(denominacion__icontains=query) |
            Q(marca__nombre__icontains=query) |
            Q(tipo__nombre__icontains=query),
            is_active=True
        ).values('id', 'rnpa', 'marca__nombre', 'tipo__nombre', 'nombre', 'denominacion')
        print(f"Productos encontrados: {productos.count()}")
        
        marcas = MarcaProducto.objects.filter(nombre__icontains=query)
        tipos_productos = TipoProducto.objects.filter(nombre__icontains=query)
        
        marcas_serializer = MarcaSerializer(marcas, many=True)
        tipos_productos_serializer = TipoProductoSerializer(tipos_productos, many=True)

        resultados = {
            'productos': productos,
            'marcas': marcas_serializer.data,
            'tipos_productos': tipos_productos_serializer.data,
        }
        
        return Response(resultados, status=200)
    
    return Response({"error": "No se proporcionó un parámetro de búsqueda."}, status=400)

@api_view(["POST"])
def find_by_barcode(request):
    barcode = request.data.get('barcode', None)
    if barcode:
        try:
            # Buscar el producto por código EAN en ProductoBarcode
            producto_barcode = ProductoBarcode.objects.get(ean=barcode)
            rnpa = producto_barcode.rnpa

            # Buscar si el RNPA está registrado en Producto
            producto = Producto.objects.filter(rnpa=rnpa).first()

            if producto:
                message = "Apto celiaco: Este producto está registrado y es apto para celiacos."
            else:
                message = "No estamos seguros de la composición del producto."
            
            # Preparar la respuesta JSON
            response_data = {
                'message': message,
                'producto_barcode': {
                    'product_name_en': producto_barcode.product_name_en,
                    'product_name_es': producto_barcode.product_name_es,
                    'generic_name': producto_barcode.generic_name,
                    'quantity': producto_barcode.quantity,
                    'serving_size': producto_barcode.serving_size,
                    'brands': producto_barcode.brands,
                    'categories': producto_barcode.categories,
                    'emb_codes': producto_barcode.emb_codes,
                    'allergens': producto_barcode.allergens,
                    'ean': producto_barcode.ean,
                    'rnpa': rnpa,
                },
                'producto': {
                    'id': producto.id if producto else None,
                    'rnpa': producto.rnpa if producto else None,
                    'marca_nombre': producto.marca.nombre if producto and producto.marca else None,
                    'tipo_nombre': producto.tipo.nombre if producto and producto.tipo else None,
                    'nombre': producto.nombre if producto else None,
                    'denominacion': producto.denominacion if producto else None,
                } if producto else None
            }

            return Response(response_data, status=200)

        except ProductoBarcode.DoesNotExist:
            return Response({"message": "No tenemos información sobre este producto."}, status=404)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
    else:
        return Response({"error": "No se proporcionó un código EAN."}, status=400)