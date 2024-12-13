import React from "react";
import { StyleSheet, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

const ReportsNumber = ({
  number,
  iconSize = 30,
  iconColor = Colors.mJordan,
  icon = "exclamation",
  iconStyle,
  containerStyle,
  numberStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <EvilIcons
        name={icon}
        size={iconSize}
        color={iconColor}
        style={iconStyle}
      />
      <TextCommonsRegular style={[styles.number, numberStyle]}>
        {number}
      </TextCommonsRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  number: {
    fontSize: 16,
    color: Colors.mJordan,
  },
});

export default ReportsNumber;
