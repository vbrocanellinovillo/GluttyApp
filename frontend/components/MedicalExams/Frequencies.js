import { StyleSheet, View } from "react-native";

export default function Frequencies({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    marginTop: 6,
  },
});
