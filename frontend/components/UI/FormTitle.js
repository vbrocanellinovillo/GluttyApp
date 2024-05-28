import { StyleSheet, Text, View } from "react-native";


export default function FormTitle({ children, color }) {
  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, { color }]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },

  titleContainer: {
    marginVertical: 0,
  },
});
