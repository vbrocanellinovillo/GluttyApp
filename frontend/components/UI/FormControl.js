import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../../constants/colors";

export default function FormControl({ placeholder, secure }) {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.formControl}
      placeholderTextColor={"#aaa"}
      secureTextEntry={secure}
    />
  );
}

const styles = StyleSheet.create({
  formControl: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "white",
    marginVertical: 14,
    borderWidth: 1,
    borderColor: Colors.mJordan,
    borderRadius: 8,
    fontSize: 16
  },
});
