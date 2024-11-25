import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import * as Haptics from "expo-haptics";

export default function InitialFilter({ filter, onPress }) {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress && onPress(filter);
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.container, styles.pressed] : styles.container
      }
      onPress={handlePress}
    >
      <TextCommonsMedium style={styles.text}>{filter}</TextCommonsMedium>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: Colors.whiteJordan,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.mJordan,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.9,
  },

  pressed: {
    opacity: 0.9,
  },

  text: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.mJordan,
  },
});
