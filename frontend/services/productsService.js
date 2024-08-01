import { Product } from "../models/Product";
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
      "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. \nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
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
      "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
    rnpa: "793969749-8",
    estado: false,
  },
  {
    id: 4,
    tipo_producto: "Langers - Cranberry Cocktail",
    marca: "Siemens",
    nombre_fantasia: "Fabaceae",
    denominacion_venta:
      "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\nIn congue. Etiam justo. Etiam pretium iaculis justo.\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
    rnpa: "280948259-4",
    estado: true,
  },
  {
    id: 5,
    tipo_producto: "Cheese - Mozzarella, Buffalo",
    marca: "alcatel",
    nombre_fantasia: "Cyperaceae",
    denominacion_venta:
      "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
    rnpa: "978471142-7",
    estado: true,
  },
  {
    id: 6,
    tipo_producto: "Cheese - Cheddar, Medium",
    marca: "Infinix",
    nombre_fantasia: "Asteraceae",
    denominacion_venta:
      "Maecenas leo odio, condimentumid luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
    rnpa: "047000626-9",
    estado: true,
  },
  {
    id: 7,
    tipo_producto: "Tart - Butter Plain Squares",
    marca: "alcatel",
    nombre_fantasia: "Cactaceae",
    denominacion_venta: "Fusce consequat. Nulla nisl. Nunc nisl.",
    rnpa: "631055974-5",
    estado: false,
  },
  {
    id: 8,
    tipo_producto: "Octopus - Baby, Cleaned",
    marca: "Haier",
    nombre_fantasia: "Leskeaceae",
    denominacion_venta:
      "Morbi porttitor loremidligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
    rnpa: "692328620-4",
    estado: true,
  },
  {
    id: 9,
    tipo_producto: "Lemonade - Strawberry, 591 Ml",
    marca: "alcatel",
    nombre_fantasia: "Pinaceae",
    denominacion_venta:
      "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\nIn hac habitasse platea dictumst. Morbi vestibulum, velitidpretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
    rnpa: "241620075-5",
    estado: true,
  },
];

const marcas = [
  { id: 1, name: "Audi" },
  { id: 2, name: "Buick" },
  { id: 3, name: "Volkswagen" },
  { id: 4, name: "Chevrolet" },
  { id: 5, name: "Lexus" },
  { id: 6, name: "Saturn" },
  { id: 7, name: "MG" },
  { id: 8, name: "Ford" },
  { id: 9, name: "Chrysler" },
  { id: 10, name: "BMW" },
  { id: 11, name: "Mitsubishi" },
  { id: 12, name: "Chevrolet" },
  { id: 13, name: "Dodge" },
  { id: 14, name: "Jeep" },
  { id: 15, name: "Ford" },
  { id: 16, name: "Mercedes-Benz" },
  { id: 17, name: "Buick" },
  { id: 18, name: "Buick" },
  { id: 19, name: "Land Rover" },
  { id: 20, name: "Mitsubishi" },
  { id: 21, name: "Dodge" },
  { id: 22, name: "Hyundai" },
  { id: 23, name: "Nissan" },
  { id: 24, name: "Audi" },
  { id: 25, name: "Volkswagen" },
  { id: 26, name: "Geo" },
  { id: 27, name: "Lincoln" },
  { id: 28, name: "Lexus" },
  { id: 29, name: "GMC" },
  { id: 30, name: "Dodge" },
];

const tipos = [
  { id: 1, name: "Eunectes sp." },
  { id: 2, name: "Anthropoides paradisea" },
  { id: 3, name: "Streptopelia senegalensis" },
  { id: 4, name: "Rhabdomys pumilio" },
  { id: 5, name: "Nyctea scandiaca" },
  { id: 6, name: "Cabassous sp." },
  { id: 7, name: "Sula dactylatra" },
  { id: 8, name: "Felis libyca" },
  { id: 9, name: "Phasianus colchicus" },
  { id: 10, name: "Crotalus triseriatus" },
  { id: 11, name: "Merops bullockoides" },
  { id: 12, name: "Dromaeus novaehollandiae" },
  { id: 13, name: "Fulica cristata" },
  { id: 14, name: "Xerus sp." },
  { id: 15, name: "Halcyon smyrnesis" },
  { id: 16, name: "Sauromalus obesus" },
  { id: 17, name: "Varanus salvator" },
  { id: 18, name: "Macropus robustus" },
  { id: 19, name: "Zenaida asiatica" },
  { id: 20, name: "Egretta thula" },
  { id: 21, name: "Plectopterus gambensis" },
  { id: 22, name: "Phoeniconaias minor" },
  { id: 23, name: "Canis mesomelas" },
  { id: 24, name: "Tachybaptus ruficollis" },
  { id: 25, name: "Dasyurus maculatus" },
  { id: 26, name: "Anastomus oscitans" },
  { id: 27, name: "Varanus sp." },
  { id: 28, name: "Pelecanus conspicillatus" },
  { id: 29, name: "Ctenophorus ornatus" },
  { id: 30, name: "Falco mexicanus" },
  { id: 31, name: "Laniaurius atrococcineus" },
  { id: 32, name: "Lepus townsendii" },
  { id: 33, name: "Epicrates cenchria maurus" },
  { id: 34, name: "Redunca redunca" },
  { id: 35, name: "Hyaena brunnea" },
  { id: 36, name: "Pteropus rufus" },
  { id: 37, name: "Ephippiorhynchus mycteria" },
  { id: 38, name: "Nucifraga columbiana" },
  { id: 39, name: "Zonotrichia capensis" },
  { id: 40, name: "Macaca fuscata" },
];

const fetchData = async () => {
  await sleep(5000);
  return { productos, marcas, tipos };
};

export async function fetchProducts({ searchTerm, brands, types }) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({ searchTerm, brands, types }),
    headers: { "Content-Type": "application/json" },
  };

  const requestUrl = url + "find/";
  try {
    const data = await fetchData();

    const products = [];

    for (let dataPoint of data.productos) {
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

    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      products: filteredProducts,
      brands: data.marcas,
      types: data.tipos,
    };
  } catch (error) {
    console.log("fallo");
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
      fetchedProductData.rnpa,
      false
    );

    return { isApt: data.is_apt, message: data.message, product: product };
  } catch (error) {
    throw new Error(error.message);
  }
}
