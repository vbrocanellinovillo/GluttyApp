import pandas as pd
from sqlalchemy import create_engine

# Leer el archivo Excel
df = pd.read_excel('d:\Documents\Downloads\productosANMAT.xlsx')

# Obtener los valores únicos de la columna 'TipoProducto'
tipos_productos_unicos = df['TipoProducto'].unique()
print(tipos_productos_unicos)

# # Convertir a un DataFrame, ordenar alfabéticamente y eliminar duplicados
df_tipos_productos = pd.DataFrame(tipos_productos_unicos, columns=['nombre'])
df_tipos_productos.sort_values(by='nombre', inplace=True)
print(df_tipos_productos)

# # Conectar a la base de datos PostgreSQL
engine = create_engine('postgresql+psycopg2://celinahunziker:niHosDyld/ov4nus60@200.69.137.167:54321/postgres')

# # Insertar los valores únicos y ordenados en la tabla 'tipos_producto'
df_tipos_productos.to_sql('productos_tipoproducto', engine, if_exists='append', index=False)

# print("Tipos de productos insertados correctamente.")
