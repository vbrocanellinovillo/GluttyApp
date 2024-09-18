import { StyleSheet, View } from "react-native";
import FormTitle from "./FormTitle";

export default function FormSectionContainer({
  children,
  style,
  titleStyle,
  title,
}) {
  return (
    <View style={[styles.sectionContainer, style]}>
      <FormTitle style={titleStyle}>{title}</FormTitle>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 10,
    gap: 20,
  },
});
