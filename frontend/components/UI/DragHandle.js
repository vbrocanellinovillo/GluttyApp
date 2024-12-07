import { StyleSheet, View } from "react-native";
import DragBar from "./DragBar";

export default function DragHandle({ style, dragBarStyle }) {
  return (
    <View style={[styles.container, style]} collapsable={false}>
      <DragBar style={[dragBarStyle, { width: "90%" }]} />
      <DragBar style={dragBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    paddingHorizontal: 50,
    paddingTop: 16,
    gap: 6,
    alignItems: "center",
  },
});
