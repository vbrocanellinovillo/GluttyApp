import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { TextInput } from "react-native-paper";
import { useState } from "react";

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
  textarea,
  autoCapitalize,
  maxLength,
}) {
  const [hideText, setHideText] = useState(secure ? true : false);

  function toggleHiddeText() {
    setHideText(!hideText);
  }

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
          {
            borderColor: touched && errors ? Colors.redError : Colors.mJordan,
          },
        ]}
        secureTextEntry={hideText}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
        textColor={Colors.mJordan}
        underlineStyle={{ display: "none" }}
        theme={{ roundness: 8 }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        right={
          secure && (
            <TextInput.Icon
              icon={hideText ? "eye" : "eye-off"}
              color={Colors.mJordan}
              onPress={toggleHiddeText}
            />
          )
        }
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
    minHeight: 100,
    paddingBottom: 30,
  },
});
