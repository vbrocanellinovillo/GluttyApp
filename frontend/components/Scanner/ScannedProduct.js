import { StyleSheet, View } from "react-native";
import ScanYourProduct from "./ScanYourProduct";
import ScannerLoading from "../UI/Loading/ScannerLoading";
import ScannedProductDetails from "./ScannedProductDetails";

export default function ScannedProduct({ product, isLoading }) {
  let content = <ScanYourProduct />;

  if (isLoading) content = <ScannerLoading />;

  if (product && !isLoading)
    content = <ScannedProductDetails product={product} />;

  return <View style={styles.productDetail}>{content}</View>;
}

const styles = StyleSheet.create({
  productDetail: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    width: 300,
    minHeight: 210,
    maxHeight: 370,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
