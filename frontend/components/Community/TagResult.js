import { StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function TagResult({
  textStyle,
  iconStyle,
  icon = "search-outline",
  tag,
}) {
  return (
    <>
      <Ionicons
        name={icon}
        size={22}
        color={Colors.mJordan}
        style={iconStyle}
      />
      <TextCommonsMedium style={[styles.text, textStyle]}>
        #{tag.name}
      </TextCommonsMedium>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
