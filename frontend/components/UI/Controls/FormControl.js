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
  keyboardType,
  autoCapitalize,
  textarea,
}) {
  return (
    <View style={styles.container}>
      <TextInput
        label={
          <Text
            style={{
              color: touched && errors ? Colors.redError : "#aaa",
            }}
          >
            {label}
          </Text>
        }
        style={[
          textarea ? [styles.formControl, styles.textarea] : styles.formControl,
          { borderColor: touched && errors ? Colors.redError : Colors.mJordan },
        ]}
        secureTextEntry={secure}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        textColor={Colors.mJordan}
        underlineStyle={{ display: "none" }}
        theme={{ roundness: 8 }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        numberOfLines={10}
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
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },

  errorText: {
    fontSize: 16,
    color: Colors.redError,
  },

  textarea: {
    textAlignVertical: "top",
    minHeight: 100,
  },
});
