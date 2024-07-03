from django.shortcuts import render
from rest_framework import generics, status, viewsets
from .models import *
from .serializers import *
from django.contrib.postgres.search import SearchQuery, SearchRank
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Producto, MarcaProducto, TipoProducto
from .serializers import ProductoSerializer, MarcaSerializer, TipoProductoSerializer
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
    print(query)
    if query:
        search_query = SearchQuery(query)
    
        productos = Producto.objects.annotate(
            rank=SearchRank('search_vector', search_query)
        ).filter(rank__gte=0.1, is_active=True).order_by('-rank')
        print(f"Productos encontrados: {productos.count()}")
        
        productos_serializer = ProductoSerializer(productos, many=True)
        
        marcas = MarcaProducto.objects.filter(nombre__icontains=query)
        tipos_productos = TipoProducto.objects.filter(nombre__icontains=query)
        
        marcas_serializer = MarcaSerializer(marcas, many=True)
        tipos_productos_serializer = TipoProductoSerializer(tipos_productos, many=True)

        resultados = {
            'productos': productos_serializer.data,
            'marcas': marcas_serializer.data,
            'tipos_productos': tipos_productos_serializer.data,
        }
        
        return Response(resultados, status=200)
    
    return Response({"error": "No se proporcionó un parámetro de búsqueda."}, status=400)

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
        
        # productos_serializer = ProductoSerializer(productos, many=True)
        # data = []
        # # for producto in productos_serializer:
        # for producto in productos:
        #     p = {
        #         'id': producto.id,
        #         'rnpa': producto.rnpa,
        #         'marca': producto.marca.nombre,
        #         'tipo': producto.tipo.nombre,
        #         'nombre': producto.nombre,
        #         'denominacion': producto.denominacion
        #     }
        #     data.append(p)
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