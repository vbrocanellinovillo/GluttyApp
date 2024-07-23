import { StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
} from "react-native-reanimated";

export default function DetailContainer({ children, style }) {
  return (
    <Animated.View
      style={[styles.productDetail, style]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {children}
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
    maxHeight: 370,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
});
