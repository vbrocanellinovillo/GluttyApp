import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import BlurContainer from "../BlurContainer";
import { Colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function Picker({ data, value }) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    Haptics.selectionAsync();
    setVisible((prevVisible) => !prevVisible);
  }

  return (
    <>
      <Pressable
        onPress={toggleVisible}
        style={({ pressed }) =>
          pressed ? [styles.container, styles.pressed] : [styles.container]
        }
      >
        <TextCommonsRegular style={styles.valueText}>value</TextCommonsRegular>
        <Ionicons name="chevron-down" color={Colors.mJordan} size={18} />
      </Pressable>
      <BlurContainer
        visible={visible}
        onDismiss={toggleVisible}
        backdropContainerStyle={styles.blurredContainer}
        backdropStyle={styles.blurredBackdrop}
      >
        <WheelPicker
          data={data}
          style={styles.wheelPicker}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
      </BlurContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eee",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 12,
    width: "100%",
    borderRadius: 12,
  },

  pressed: {
    opacity: 0.7,
  },

  valueText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  blurredContainer: {
    justifyContent: "center",
  },

  blurredBackdrop: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  wheelPicker: {
    backgroundColor: "#eee",
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
