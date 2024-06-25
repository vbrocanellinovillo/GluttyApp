import { StyleSheet } from "react-native";
import GradientText from "../GradientText";

export default function HeaderTitle({ children }) {
  return <GradientText style={styles.title}>{children}</GradientText>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
  },
});
