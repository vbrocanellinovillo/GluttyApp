import { Product } from "../models/Product";
import Json from "../assets/mock_alimentos.json";
import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";
import { sleep } from "../utils/utilFunctions";

const url = backendUrl + "productos/";

const productos = [
  {
    id: 1,
    tipo_producto: "Beer - Corona",
    marca: "verykool",
    nombre_fantasia: "Asteraceae",
    denominacion_venta:
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
    rnpa: "631035937-1",
    estado: false,
  },
  {
    id: 2,
    tipo_producto: "Saskatoon Berries - Frozen",
    marca: "Huawei",
    nombre_fantasia: "Bacidiaceae",
    denominacion_venta:
      "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
    rnpa: "354473513-X",
    estado: false,
  },
  {
    id: 3,
    tipo_producto: "Wine - Chablis J Moreau Et Fils",
    marca: "Xiaomi",
    nombre_fantasia: "Cucurbitaceae",
    denominacion_venta:
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    rnpa: "793969749-8",
    estado: false,
  },
  {
    id: 4,
    tipo_producto: "Langers - Cranberry Cocktail",
    marca: "Siemens",
    nombre_fantasia: "Fabaceae",
    denominacion_venta:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    rnpa: "280948259-4",
    estado: true,
  },
  {
    id: 5,
    tipo_producto: "Cheese - Mozzarella, Buffalo",
    marca: "alcatel",
    nombre_fantasia: "Cyperaceae",
    denominacion_venta:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    rnpa: "978471142-7",
    estado: true,
  },
];

export async function fetchProducts(values) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json" },
  };

  const requestUrl = url + "find/";
  try {
    // const data = await Json.json();
    await sleep(5000)
    const data = productos
    const products = [];

    for (let dataPoint of data) {
      const product = new Product(
        dataPoint.id,
        dataPoint.tipo_producto,
        dataPoint.marca,
        dataPoint.nombre_fantasia,
        dataPoint.denominacion_venta,
        dataPoint.rnpa,
        dataPoint.estado
      );

      products.push(product);
    }
    return products;
  } catch (error) {
    console.log("fallo");
  }
}
