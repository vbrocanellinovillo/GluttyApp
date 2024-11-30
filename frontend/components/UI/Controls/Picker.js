import WheelPicker from "@quidone/react-native-wheel-picker";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import BlurContainer from "../BlurContainer";
import { Colors } from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Button from "./Button";

export default function Picker({
  data,
  value,
  confirmButton,
  buttonText,
  buttonStyle,
  onValueChange,
  onPressButton,
  cointainerStyle,
  textStyle,
  dropButton = true,
}) {
  const [visible, setVisible] = useState(false);
  const [option, setOption] = useState(value);

  function toggleVisible() {
    Haptics.selectionAsync();
    setVisible((prevVisible) => !prevVisible);
  }

  function handleChange(option) {
    const result = option.item.value;
    setOption(result);
    onValueChange && onValueChange(result);
  }

  function handlePress() {
    onPressButton && onPressButton(option);
    setVisible(false);
  }

  return (
    <>
      <Pressable
        onPress={toggleVisible}
        style={({ pressed }) =>
          pressed ? [styles.container, styles.pressed, cointainerStyle] : [styles.container, cointainerStyle]
        }
      >
        <TextCommonsRegular style={[styles.valueText , textStyle]}>
          {value}
        </TextCommonsRegular>
        {dropButton && (
        <Ionicons name="chevron-down" color={Colors.mJordan} size={15} />)}
      </Pressable>
      <BlurContainer
        visible={visible}
        onDismiss={toggleVisible}
        backdropContainerStyle={styles.blurredContainer}
        backdropStyle={styles.blurredBackdrop}
      >
        <View style={styles.wheelPicker}>
          <WheelPicker
            data={data}
            value={value}
            onValueChanging={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }
            onValueChanged={handleChange}
          />
          {confirmButton && (
            <Button style={[styles.button, buttonStyle]} onPress={handlePress}>
              {buttonText ? buttonText : "Confirmar"}
            </Button>
          )}
        </View>
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
    paddingBottom: 14,
    paddingHorizontal: 18,
    
  },

  button: {
    marginTop: 14,
  },
});
