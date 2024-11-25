import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function BoxDashboard({ image, number }) {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.icon} />
      <Text style={styles.number}>{number}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 8,
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginBottom: 8,
  },
  number: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

