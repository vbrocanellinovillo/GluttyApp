import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default function TriangleResponse({ isAnswer }) {
  return (
    <View
      style={[
        styles.triangle,
        {
          right: !isAnswer && 5,
          transform: [{ rotate: !isAnswer ? "330deg" : "0deg" }],
          display: isAnswer && "none",
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  triangle: {
    position: "absolute",
    bottom: -10,
    width: 0,
    height: 0,
    borderTopWidth: 25,
    borderTopColor: "transparent",
    borderBottomWidth: 25,
    borderBottomColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: Colors.roca,
    zIndex: 0,
  },
});
