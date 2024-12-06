import { Pressable, StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function TagChip({
  tag,
  itemStyle,
  textStyle,
  iconStyle,
  onPress,
}) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress(tag);
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.item, styles.pressed, itemStyle]
          : [styles.item, itemStyle]
      }
      onPress={handlePress}
    >
      {tag?.isUser && (
        <Ionicons name="person" size={16} color={Colors.vainilla} />
      )}
      <TextCommonsMedium style={[styles.text, textStyle]}>
        {tag?.name}
      </TextCommonsMedium>
      <Ionicons
        name="close"
        size={18}
        color={Colors.mJordan}
        style={iconStyle}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: Colors.locro,
  },

  pressed: {
    opacity: 0.7,
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
