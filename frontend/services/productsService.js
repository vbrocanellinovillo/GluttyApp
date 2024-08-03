import { Product } from "../models/Product";
import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "productos/";

export async function fetchProducts({ searchTerm, brands, types }) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ q: searchTerm, marca: brands, tipo: types }),
    headers: { "Content-Type": "application/json" },
  };

  const requestUrl = url + "find/";
  try {
    const data = await httpRequest(requestUrl, requestOptions);

    const products = [];

    if (data.productos) {
      for (let dataPoint of data.productos) {
        const product = new Product(
          dataPoint.id,
          dataPoint.tipo__nombre,
          dataPoint.marca__nombre,
          dataPoint.nombre,
          dataPoint.denominacion,
          dataPoint.rnpa
        );

        products.push(product);
      }
    }

    return {
      products: products,
      brands: data.marcas,
      types: data.tipos_productos,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function scanProduct(eanCode) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ barcode: eanCode }),
    headers: { "Content-Type": "application/json" },
  };

  const requestUrl = url + "find-by-barcode/";

  try {
    const data = await httpRequest(requestUrl, requestOptions);

    const fetchedProductData = data.producto;

    const product = new Product(
      fetchedProductData.id,
      fetchedProductData.tipo_nombre,
      fetchedProductData.marca_nombre,
      fetchedProductData.nombre,
      fetchedProductData.denominacion,
      fetchedProductData.rnpa
    );

    return { isApt: data.is_apt, message: data.message, product: product };
  } catch (error) {
    throw new Error(error.message);
  }
}
