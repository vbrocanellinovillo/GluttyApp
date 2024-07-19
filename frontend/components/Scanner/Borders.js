import { StyleSheet, View } from "react-native";

export default function Borders({ color }) {
  return (
    <>
      <View style={[styles.corner, styles.topLeft, { borderColor: color }]} />
      <View style={[styles.corner, styles.topRight, { borderColor: color }]} />
      <View
        style={[styles.corner, styles.bottomLeft, { borderColor: color }]}
      />
      <View
        style={[styles.corner, styles.bottomRight, { borderColor: color }]}
      />
    </>
  );
}

const position = -5;
const borderWidth = 7;
const borderRadius = 20;

const styles = StyleSheet.create({
  corner: {
    position: "absolute",
    width: 100,
    height: 100,
  },

  topLeft: {
    borderTopWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderTopLeftRadius: borderRadius,
    top: position,
    left: position,
  },

  topRight: {
    borderTopWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderTopRightRadius: borderRadius,
    top: position,
    right: position,
  },

  bottomLeft: {
    borderBottomWidth: borderWidth,
    borderLeftWidth: borderWidth,
    borderBottomLeftRadius: borderRadius,
    bottom: position,
    left: position,
  },

  bottomRight: {
    borderBottomWidth: borderWidth,
    borderRightWidth: borderWidth,
    borderBottomRightRadius: borderRadius,
    bottom: position,
    right: position,
  },
});
