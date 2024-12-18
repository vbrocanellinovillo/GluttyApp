import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import * as Haptics from "expo-haptics";
import Icon from "react-native-vector-icons/MaterialIcons";

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
  check = false,
  asyncValidation = undefined,
}) {
  const [formErrors, setErrors] = useState(errors);
  const [hideText, setHideText] = useState(secure ? true : false);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    setErrors(errors);
  }, [errors]);

  useEffect(() => {
    if (asyncValidation) {
      validateAsync();
    }
  }, [value]);

  async function validateAsync() {
    try {
      await asyncValidation(value);
      setErrors("");
    } catch (error) {
      setErrors(error.message);
    }
  }

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
                touched && formErrors
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
            borderColor:
              touched && formErrors ? Colors.redError : Colors.mJordan,
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
      {formErrors && touched && (
        <Text style={styles.errorText}>{formErrors}</Text>
      )}
      {check && touched && !formErrors && (
        <View style={styles.successContainer}>
          <Icon name="check-circle" size={20} color="green" />
          <Text style={styles.successMessage}>¡Suena bien!</Text>
        </View>
      )}
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

  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  successMessage: {
    color: "green",
    marginLeft: 5,
    fontSize: 14,
  },
});
