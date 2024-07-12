import ProductDetails from "../../components/Products/ProductDetails";

export default function Details({ route }) {
  const product = route.params.product;
  return <ProductDetails product={product} />;
}
