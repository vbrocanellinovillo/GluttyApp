import { StyleSheet } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";

export default function DetailText({ children, style }) {
  return (
    <TextCommonsRegular style={[styles.text, style]}>
      {children}
    </TextCommonsRegular>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: Colors.mJordan,
  },
});
