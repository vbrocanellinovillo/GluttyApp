import { StyleSheet, Text, View } from "react-native";

export default function FormGroup({ children }) {
  return (
    <View style={styles.formGroup}>
        {children}
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },

});
