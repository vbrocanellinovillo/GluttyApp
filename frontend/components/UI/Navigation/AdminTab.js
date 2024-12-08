import React from "react";
import { Pressable, StyleSheet } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";

const AdminTab = ({ children, active, ...props }) => {
  return (
    <Pressable
      style={[styles.container, active && styles.activeStyle]}
      {...props}
    >
      <TextCommonsMedium style={styles.text}>{children}</TextCommonsMedium>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.locro,
    padding: 16,
    borderRadius: 14,
    flex: 1,
    shadowColor: Colors.locro,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
  },

  activeStyle: {
    borderWidth: 1.2,
    borderColor: Colors.mJordan,
  },
});

export default AdminTab;
