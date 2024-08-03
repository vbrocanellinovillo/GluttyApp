import { StyleSheet } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function FallbackText({ children, style }) {
  return (
    <TextCommonsRegular style={[styles.text, style]}>
      {children}
    </TextCommonsRegular>
  );
}

const styles = StyleSheet.create({
  text: {
    fontStyle: "italic",
    fontWeight: "300",
    fontSize: 16
  },
});
