import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function DragBar({ style }) {
  return <View style={[styles.container, style]} />;
}

const styles = StyleSheet.create({
  container: {
    height: 3,
    borderRadius: 10,
    backgroundColor: Colors.mJordan,
    width: "100%",
  },
});
