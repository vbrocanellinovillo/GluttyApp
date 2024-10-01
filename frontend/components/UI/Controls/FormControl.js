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
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import * as Haptics from "expo-haptics";

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
  autocompleteOptions = [], // que lleguen de la forma {id, name}
}) {
  const [hideText, setHideText] = useState(secure ? true : false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  const hasAutocomplete = autocompleteOptions.length > 0;

  function toggleHiddeText() {
    setHideText(!hideText);
  }

  function handleChangeText(text) {
    if (!handleChange) return;

    handleChange(name)(text);

    if (text.length > 0 && hasAutocomplete) {
      const filtered = autocompleteOptions.filter((option) =>
        option.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  }

  function handleSelectOption(option) {
    Haptics.selectionAsync();
    handleChange(name)(option.name);
    setFilteredOptions([]);
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
        onChangeText={handleChangeText}
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
      {filteredOptions.length > 0 && (
        <View>
          <ScrollView contentContainerStyle={styles.autocompleteContainer}>
            {filteredOptions.map((option) => (
              <Pressable
                key={option.id}
                style={({ pressed }) =>
                  pressed
                    ? [styles.autocompleteOptionContainer, styles.pressedOption]
                    : [styles.autocompleteOptionContainer]
                }
                onPress={handleSelectOption.bind(this, option)}
              >
                <TextCommonsMedium style={styles.autocompleteItem}>
                  {option.name}
                </TextCommonsMedium>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
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

  autocompleteContainer: {
    backgroundColor: "#eee",
    borderRadius: 16,
    padding: 20,
    marginTop: 2,
    gap: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  autocompleteOptionContainer: {
    justifyContent: "center",
    padding: 6,
  },

  pressedOption: {
    opacity: 0.5,
  },

  autocompleteItem: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.mJordan,
  },
});
