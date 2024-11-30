import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DetailText from "./DetailText";

export default function ServiceInfo({ children, containerStyle, textStyle }) {
  return (
    <View style={[styles.service, containerStyle]}>
      <Ionicons name="checkmark-circle" size={22} color="green" />
      <DetailText style={textStyle}>{children}</DetailText>
    </View>
  );
}

const styles = StyleSheet.create({
  service: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 4,
  },
});
