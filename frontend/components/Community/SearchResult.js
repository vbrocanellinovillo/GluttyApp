import { Pressable, StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function SearchResult({
  onPress,
  containerStyle,
  textStyle,
  iconStyle,
  icon = "search-outline",
  tag,
}) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress(tag);
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
        size={22}
        color={Colors.mJordan}
        style={iconStyle}
      />
      <TextCommonsMedium style={[styles.text, textStyle]}>
        #{tag.name}
      </TextCommonsMedium>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },

  pressed: {
    opacity: 0.7,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
