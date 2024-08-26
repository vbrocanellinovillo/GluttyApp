import { StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function DetailTitle({ children }) {
  return <TextCommonsMedium style={styles.title}>{children}</TextCommonsMedium>;
}

const styles = StyleSheet.create({
  title: {
    color: "#aaa",
    fontSize: 20,
    marginBottom: 4
  },
});
