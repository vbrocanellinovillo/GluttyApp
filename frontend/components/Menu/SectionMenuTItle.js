import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function SectionMenuTitle({ children, style }) {
  return (
    <TextCommonsMedium style={[styles.title, style]}>
      {children}
    </TextCommonsMedium>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    color: Colors.mJordan,
  },
});
