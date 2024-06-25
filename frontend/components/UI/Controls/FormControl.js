import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { TextInput } from "react-native-paper";

export default function FormControl({
  label,
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
        label={label}
        style={styles.formControl}
        placeholderTextColor={touched && errors ? Colors.redError : "#aaa"}
        secureTextEntry={secure}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        mode="outlined"
        outlineColor={touched && errors ? Colors.redError : Colors.mJordan}
        outlineStyle={{ borderRadius: 8, borderWidth: 1.1 }}
        activeOutlineColor={
          touched && errors ? Colors.redError : Colors.mJordan
        }
        textColor={Colors.mJordan}
        
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
    backgroundColor: "white",
    fontSize: 16,
    marginBottom: 5,
  },

  errorText: {
    fontSize: 16,
    color: Colors.redError,
  },
});
