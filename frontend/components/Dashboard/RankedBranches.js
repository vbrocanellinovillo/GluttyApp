import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function RankedBranches({ image, title, branches }) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Image source={{uri:image}} style={styles.image} />
        </View>
        {branches.map((branch, index) => (
          <Text key={index} style={styles.branch}>
            <Text style={styles.rank}>#{index + 1} </Text> {/* Negrita para el número */}
            {branch || "-"}
          </Text>
        ))}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#A7DADC",
      borderRadius: 16,
      padding: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
      width: 350,
      alignSelf: "center", // Centrar el componente en el contenedor principal
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      flex: 1,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: "contain",
    },
    branch: {
      fontSize: 14,
      color: "#333",
      marginBottom: 8,
    },
    rank: {
      fontWeight: "bold", // Negrita para los números
    },
  });
