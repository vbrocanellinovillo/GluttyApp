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
    if query:
        start_time_db = time.time()
        
        # Configurar la configuración de búsqueda en español
        spanish_config = 'spanish'
        
        # Construir la consulta de búsqueda
        search_query = SearchQuery(query, config=spanish_config)
        
        # Filtrar productos por coincidencias exactas o similares en el search_vector
        productos = Producto.objects.annotate(
            rank=SearchVector('nombre', 'denominacion', 'rnpa', 'marca__nombre', 'tipo__nombre', config=spanish_config)
        ).filter(
            Q(nombre__icontains=query) | Q(denominacion__icontains=query) | Q(rnpa__icontains=query) |
            Q(marca__nombre__icontains=query) | Q(tipo__nombre__icontains=query) |
            Q(search_vector=query) | Q(search_vector__icontains=query),
            is_active=True
        ).order_by('-rank').select_related('marca', 'tipo').values(
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


from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Producto, MarcaProducto, TipoProducto
from .serializers import ProductoSerializer, MarcaSerializer, TipoProductoSerializer

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