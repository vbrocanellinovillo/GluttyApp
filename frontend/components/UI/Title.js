import { StyleSheet, Text, View } from "react-native";

export default function Title({ children, color }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, { color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginVertical: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2
  },
});
