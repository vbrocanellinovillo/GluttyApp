import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

export default function SaveMessage({ onSave }) {
  const [saved, setSaved] = useState(false);

  async function handlePress() {
    Haptics.selectionAsync();
    setSaved(!saved);

    try {
      onSave && (await onSave());
    } catch (error) {
      setSaved(saved);
    }
  }

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.saveIcon, styles.pressed] : [styles.saveIcon]
      }
      onPress={handlePress}
    >
      <Ionicons
        name={saved ? "bookmark" : "bookmark-outline"}
        color={Colors.mJordan}
        size={20}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  saveIcon: {
    position: "absolute",
    bottom: 10,
    right: 20,
    padding: 6,
    backgroundColor: "white",
    borderRadius: 100,
  },

  pressed: {
    opacity: 0.7,
  },
});
