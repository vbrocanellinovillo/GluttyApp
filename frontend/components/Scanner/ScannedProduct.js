import { StyleSheet } from "react-native";
import ScanYourProduct from "./ScanYourProduct";
import ScannerLoading from "../UI/Loading/ScannerLoading";
import ScannedProductDetails from "./ScannedProductDetails";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import NotFoundProduct from "./NotFoundProduct";

export default function ScannedProduct({
  product,
  isLoading,
  isContracted,
  onExpand,
  error,
}) {
  let content = <ScanYourProduct />;

  if (isLoading) content = <ScannerLoading />;

  if (error && !isLoading) content = <NotFoundProduct error={error} />;

  if (product && !isLoading)
    content = (
      <ScannedProductDetails
        product={product}
        onExpand={onExpand}
        isContracted={isContracted}
      />
    );

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: isContracted ? withSpring(360, { damping: 18 }) : withSpring(210),
    };
  });

  const expandedStyle = isContracted ? { height: 360 } : undefined;

  return (
    <Animated.View style={[styles.productDetail, animatedHeight]}>
      {content}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  productDetail: {
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 10,
    width: 300,
    minHeight: 210,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
