import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function PostInfo({
  icon,
  iconSize,
  iconColor,
  number,
  numberStyle,
  iconStyle,
  containerStyle,
  onPress,
}) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress();
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, containerStyle]
          : [styles.container, containerStyle]
      }
      onPress={handlePress}
    >
      <Ionicons
        name={icon}
        color={iconColor || Colors.mJordan}
        size={iconSize || 24}
        style={iconStyle}
      />
      <TextCommonsMedium style={[styles.number, numberStyle]}>
        {number}
      </TextCommonsMedium>
    </Pressable>
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

  pressed: {
    opacity: 0.6,
  },

  number: {
    fontSize: 14,
    color: Colors.mJordan,
  },
});
