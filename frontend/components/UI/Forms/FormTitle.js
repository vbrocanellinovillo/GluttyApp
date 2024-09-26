import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";

export default function FormTitle({ children, color, style }) {
  return (
    <View style={styles.titleContainer}>
      <TextCommonsMedium style={[styles.title, { color }, style]}>
        {children}
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
  },

  titleContainer: {
    marginVertical: 0,
  },
});
