import { StyleSheet, Text, View } from "react-native";
import Link from "./Link";

export default function NavigationText({ children, action, color, href }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color }]}>{children}</Text>
      <Link color={color} href={href}>{action}</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center"
  },

  text: {
    fontSize: 18,
    fontWeight: "light"
  },
});
