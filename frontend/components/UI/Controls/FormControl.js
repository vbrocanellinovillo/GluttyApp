/*import { StyleSheet, Text, View } from "react-native";
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
  style,
  containerStyle,
  labelColor,
}) {
  const [hideText, setHideText] = useState(secure ? true : false);

  function toggleHiddeText() {
    setHideText(!hideText);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={
          <Text
            style={{
              color:
                touched && errors
                  ? Colors.redError
                  : labelColor
                  ? labelColor
                  : "#aaa",
            }}
          >
            {label}
          </Text>
        }
        style={[
          textarea
            ? [styles.formControl, styles.textarea, style]
            : [styles.formControl, style],
          {
            borderColor: touched && errors ? Colors.redError : Colors.mJordan,
          },
        ]}
        secureTextEntry={hideText}
        onChangeText={handleChange ? handleChange(name) : () => undefined}
        onBlur={handleBlur ? handleBlur(name) : () => undefined}
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
  },*/


import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "../../../constants/colors";


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
  style,
  containerStyle,
  labelColor,
  editable = true, // Nueva propiedad editable con valor por defecto true
}) {
  const [hideText, setHideText] = useState(secure ? true : false);

  function toggleHiddeText() {
    setHideText(!hideText);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        label={
          <Text
            style={{
              color:
                touched && errors
                  ? Colors.redError
                  : labelColor
                  ? labelColor
                  : "#aaa",
            }}
          >
            {label}
          </Text>
        }
        style={[
          textarea
            ? [styles.formControl, styles.textarea, style]
            : [styles.formControl, style],
          {
            borderColor: touched && errors ? Colors.redError : Colors.mJordan,
          },
        ]}
        secureTextEntry={hideText}
        onChangeText={handleChange ? handleChange(name) : () => undefined}
        onBlur={handleBlur ? handleBlur(name) : () => undefined}
        value={value}
        textColor={Colors.mJordan}
        underlineStyle={{ display: "none" }}
        theme={{ roundness: 8 }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        editable={editable} // Añadimos la propiedad editable
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
    fontSize: 15,
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

