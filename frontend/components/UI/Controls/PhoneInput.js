import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { Portal, TextInput } from "react-native-paper";
import { useState, useEffect } from "react";
import { CountryPicker } from "react-native-country-codes-picker";

export default function PhoneInput({
  label,
  onChange,
  handleBlur,
  name,
  value,
  defaultCode,
  touched,
  errors,
  maxLength,
  style,
  containerStyle,
  labelColor,
  codeStyle,
  flagStyle,
}) {
  const [countryCode, setCountryCode] = useState(defaultCode.code);
  const [countryFlag, setCountryFlag] = useState(defaultCode.flag);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // Extraer el número de teléfono sin el código de país
  const phoneNumber = value.startsWith(countryCode)
    ? value.slice(countryCode.length)
    : value;

  useEffect(() => {
    // Actualizar el valor completo cuando cambie el código de país
    const newPhoneNumber = value.startsWith(countryCode)
      ? value.slice(countryCode.length)
      : value.replace(/^\+\d+/, ""); // Eliminar el código de país anterior

    const updatedValue = countryCode + newPhoneNumber;
    onChange(updatedValue);
  }, [countryCode]);

  function toggleCountryPicker() {
    setShowCountryPicker(!showCountryPicker);
  }

  function selectCountry({ dial_code, flag }) {
    setCountryCode(dial_code);
    setCountryFlag(flag);
    toggleCountryPicker();
  }

  function setPhone(text) {
    const resultPhone = countryCode + text;
    onChange(resultPhone);
  }

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.phoneCodeContainer}
            onPress={toggleCountryPicker}
          >
            <View
              style={[
                styles.formControl,
                styles.phoneCodeView,
                {
                  borderColor:
                    touched && errors ? Colors.redError : Colors.mJordan,
                },
              ]}
            >
              <Text style={[styles.codeFlag, flagStyle]}>{countryFlag}</Text>
              <Text
                style={[
                  styles.phoneCode,
                  {
                    color:
                      touched && errors
                        ? Colors.redError
                        : labelColor
                        ? labelColor
                        : Colors.mJordan,
                  },
                  codeStyle,
                ]}
              >
                {countryCode}
              </Text>
            </View>
          </TouchableOpacity>
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
              [styles.formControl, style],
              {
                borderColor:
                  touched && errors ? Colors.redError : Colors.mJordan,
              },
            ]}
            onChangeText={setPhone}
            onBlur={handleBlur ? handleBlur(name) : () => undefined}
            value={phoneNumber} // Mostrar solo el número de teléfono sin el código
            textColor={Colors.mJordan}
            underlineStyle={{ display: "none" }}
            theme={{ roundness: 8 }}
            maxLength={maxLength}
            keyboardType="number-pad"
          />
        </View>
        {errors && touched && <Text style={styles.errorText}>{errors}</Text>}
      </View>
      <Portal>
        <CountryPicker
          show={showCountryPicker}
          pickerButtonOnPress={selectCountry}
          onBackdropPress={toggleCountryPicker}
          style={{
            modal: {
              height: "50%",
            },

            backdrop: {
              opacity: 0.5,
            },

            line: {
              display: "none",
            },

            textInput: {
              display: "none",
            },

            countryButtonStyles: {
              height: 60,
            },
          }}
        />
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },

  controls: {
    flexDirection: "row",
    gap: 10,
  },

  phoneCodeContainer: {
    flex: 0.4,
  },

  phoneCodeView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  phoneCode: {
    fontSize: 16,
  },

  codeFlag: {
    fontSize: 30,
  },

  formControl: {
    flex: 1,
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
});
