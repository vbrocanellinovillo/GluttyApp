import { Pressable, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export default function SectionContainer({
  style,
  pressedStyle,
  onPress,
  children,
}) {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, styles.pressed, style, pressedStyle]
          : [styles.container, style]
      }
      onPress={onPress ? handlePress : () => undefined}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    gap: 6,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
  },

  pressed: {
    opacity: 0.6,
  },
});
