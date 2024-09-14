import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";
import { useState } from "react";

export default function NumericInput({
  containerStyle,
  inputStyle,
  iconsContainerStyle,
  iconStyle,
  value,
  defaultValue = 0,
}) {
  const [number, setNumber] = useState(value ? value : defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const showValue = number.toString().trim() === "" && !isFocused ? 0 : number;

  function increaseValue() {
    setNumber((prevNumber) => (prevNumber += 1));
    if (!hasChanged) setHasChanged(true);
  }

  function decreaseValue() {
    setNumber((prevNumber) => (prevNumber -= 1));
    if (!hasChanged) setHasChanged(true);
  }

  function changeNumberHandler(text) {
    setNumber(text);
    if (!hasChanged) setHasChanged(true);
  }

  function handleFocus() {
    setIsFocused(true);

    if (number === defaultValue && !hasChanged) {
      setNumber("");
    }
  }

  function handleBlur() {
    setIsFocused(false);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        keyboardType="number-pad"
        value={showValue.toString()}
        onChangeText={changeNumberHandler}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <View style={[styles.icons, iconsContainerStyle]}>
        <TouchableOpacity onPress={increaseValue}>
          <Ionicons
            name="chevron-up"
            size={18}
            color={Colors.mJordan}
            style={iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={decreaseValue}>
          <Ionicons
            name="chevron-down"
            size={18}
            color={Colors.mJordan}
            style={iconStyle}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flexDirection: "row",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 8,
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 0 },
    elevation: 5,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  icons: {
    gap: 10,
  },
});