import { Product } from "../models/Product";
import Json from "../assets/mock_alimentos.json";

export async function fetchProducts(searchTerm) {
  const formdata = new FormData();
  formdata.append("searchTerm", searchTerm);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  //const requestUrl = url + "login/";
  try {
    const json = JSON.parse(Json);
    console.log(json);
    /* const data = await Json.json();
    const products = [];

    for (dataPoint of data) {
      const product = new Product(
        data.id,
        data.tipo_producto,
        data.marca,
        data.nombre_fantasia,
        data.denominacion_venta,
        data.rnpa,
        data.estado
      );

      products.push(product);
    } */
  } catch (error) {
    console.log("fallo");
  }
}
