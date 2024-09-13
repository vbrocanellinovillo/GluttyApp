import { StyleSheet, TextInput, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";

export default function NumericInput({ containerStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#aaa",
    padding: 10,
  },
});
