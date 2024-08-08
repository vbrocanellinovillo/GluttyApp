import { TouchableOpacity, View, StyleSheet } from "react-native";

export default function HeaderButtonContainer({ children, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>{children}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
});
