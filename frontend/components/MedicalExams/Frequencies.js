import { StyleSheet, View } from "react-native";

export default function Frequencies({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 6
  },
});
