import pandas as pd
from sqlalchemy import create_engine

# Leer el archivo Excel
df = pd.read_excel('d:\Documents\Downloads\productosANMAT.xlsx')

# Obtener los valores únicos de la columna 'TipoProducto'
marca_unicos = df['marca'].unique()
print(marca_unicos)

# # Convertir a un DataFrame, ordenar alfabéticamente y eliminar duplicados
df_marca = pd.DataFrame(marca_unicos, columns=['nombre'])
df_marca.sort_values(by='nombre', inplace=True)
print(df_marca)

# # Conectar a la base de datos PostgreSQL
engine = create_engine('postgresql+psycopg2://celinahunziker:niHosDyld/ov4nus60@200.69.137.167:54321/postgres')

# # Insertar los valores únicos y ordenados en la tabla 'tipos_producto'
df_marca.to_sql('productos_marcaproducto', engine, if_exists='append', index=False)

# print("Tipos de productos insertados correctamente.")