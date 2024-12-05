import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusIndicator({ isOpen }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isOpen ? "#4CAF50" : "#F44336" }, // Verde para abierto, rojo para cerrado
      ]}
    >
      <Text style={styles.text}>{isOpen ? "Abierto" : "Cerrado"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
