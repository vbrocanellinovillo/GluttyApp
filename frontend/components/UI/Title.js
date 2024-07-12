import { StyleSheet, Text, View } from "react-native";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";

export default function Title({ children, color }) {
  return (
    <View style={styles.titleContainer}>
      <TextCommonsMedium style={[styles.title, { color }]}>
        {children}
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2,
  },
});
