import pandas as pd
from sqlalchemy import create_engine
import psycopg2

# Configuración de la conexión a la base de datos
engine = create_engine('postgresql+psycopg2://celinahunziker:niHosDyld/ov4nus60@200.69.137.167:54321/postgres')

# Leer el archivo Excel
df = pd.read_excel('C:/Users/celih/Downloads/productosANMAT.xlsx')

# Cargar las marcas existentes en un diccionario
marcas_df = pd.read_sql_table('productos_marcaproducto', engine)
marcas_dict = marcas_df.set_index('nombre')['id'].to_dict()
print(marcas_dict)

# Cargar los tipos de producto existentes en un diccionario
tipos_df = pd.read_sql_table('productos_tipoproducto', engine)
tipos_dict = tipos_df.set_index('nombre')['id'].to_dict()
print(tipos_dict)

# Mapear los nombres de las marcas y tipos a sus IDs
df['marca_id'] = df['marca'].map(marcas_dict)
df['tipo_id'] = df['TipoProducto'].map(tipos_dict)

# Reemplazar el estado por is_active
df['is_active'] = df['Estado'].apply(lambda x: "true" if x == 'VIGENTE' else "false")

# # Renombrar columnas para que coincidan con la tabla Productos
df.rename(columns={
    'rnpa': 'rnpa',
    'nombreFantasia': 'nombre',
    'denominacionventa': 'denominacion',
    'marca_id': 'marca_id',
    'tipo_id': 'tipo_id'
}, inplace=True)

# # Seleccionar solo las columnas necesarias para la tabla Productos
productos_df = df[['rnpa', 'nombre', 'denominacion', 'is_active', 'marca_id', 'tipo_id']]
print(productos_df)

# # Insertar los datos en la tabla Productos
productos_df.to_sql('productos_producto', engine, if_exists='append', index=False)

# print("Datos insertados correctamente en la tabla Productos.")
