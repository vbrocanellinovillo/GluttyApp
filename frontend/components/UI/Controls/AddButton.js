import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";

export default function AddButton({
  onPress,
  containerStyle,
  backgroundColor,
  textStyle,
  iconStyle,
  icon,
  iconSize,
  iconColor,
  children,
}) {
  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (onPress) onPress();
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        {
          backgroundColor: backgroundColor ? backgroundColor : Colors.oceanBlue,
        },
      ]}
      onPress={handlePress}
    >
      <TextCommonsMedium style={[styles.text, textStyle]}>
        {children}
      </TextCommonsMedium>
      <Ionicons
        name={icon ? icon : "add-circle-sharp"}
        size={iconSize ? iconSize : 28}
        color={iconColor ? iconColor : Colors.darkBlue}
        style={[styles.icon, iconStyle]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.darkBlue,
  },

  icon: {
    fontWeight: "bold",
  },
});
