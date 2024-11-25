import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function LikesChart({ data }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Likes</Text>
      {data?.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progress,
                { width: `${item.percentage}%` }, // Ajusta el ancho dinámicamente
              ]}
            />
          </View>
          <Text style={styles.percentage}>{`${item.percentage}%`}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F2F2",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5D4037",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  label: {
    width: 60,
    fontSize: 14,
    color: "#5D4037",
    fontWeight: "bold",
  },

  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#F3CDA7",
    borderRadius: 5,
    overflow: "hidden",
    marginHorizontal: 8,
  },

  progress: {
    height: "100%",
    backgroundColor: "#DE761D",
    borderRadius: 5,
  },

  percentage: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#909090",
  },
});
