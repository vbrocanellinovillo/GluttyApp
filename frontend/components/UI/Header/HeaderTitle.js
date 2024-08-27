import { StyleSheet } from "react-native";
import GradientText from "../GradientText";

export default function HeaderTitle({ children, style }) {
  return <GradientText style={[styles.title, style]}>{children}</GradientText>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
});
