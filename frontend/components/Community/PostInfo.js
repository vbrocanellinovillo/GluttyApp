import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";

export default function PostInfo({
  icon,
  iconSize,
  iconColor,
  number,
  numberStyle,
  iconStyle,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons
        name={icon}
        color={iconColor || Colors.mJordan}
        size={iconSize || 24}
        style={iconStyle}
      />
      <TextCommonsMedium style={[styles.number, numberStyle]}>
        {number}
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  number: {
    fontSize: 14,
    color: Colors.mJordan,
  },
});
