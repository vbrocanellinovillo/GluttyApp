import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";

export default function FormControl({
  placeholder,
  secure,
  handleChange,
  handleBlur,
  name,
  value,
  touched,
  errors,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={
          touched && errors
            ? [styles.formControl, styles.formError]
            : styles.formControl
        }
        placeholderTextColor={touched && errors ? Colors.redError : "#aaa"}
        secureTextEntry={secure}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
      />
      {errors && touched && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },

  formControl: {
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.mJordan,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 5
  },

  formError: {
    borderWidth: 1,
    borderColor: Colors.redError,
  },

  errorText: {
    fontSize: 16,
    color: Colors.redError,
  },
});