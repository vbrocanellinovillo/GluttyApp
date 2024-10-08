import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function Tag({ children, tagStyle, textStyle, onPress }) {
  function handlePress() {
    Haptics.selectionAsync();
    onPress && onPress();
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, tagStyle]
          : [styles.container, tagStyle]
      }
      onPress={handlePress}
    >
      <TextCommonsRegular style={[styles.text, textStyle]}>
        #{children}
      </TextCommonsRegular>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexWrap: "wrap",
  },

  pressed: {
    opacity: 0.6,
  },

  text: {
    fontSize: 16,
    color: Colors.mJordan,
  },
});
