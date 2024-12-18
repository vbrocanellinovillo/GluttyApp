import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import NumericInput from "./NumericInput";
import { Colors } from "../../../constants/colors";
import { useState } from "react";

export default function MedicalControl({
  label,
  unit,
  value,
  onChange,
  errors,
  defaultValue,
  isConsulting,
}) {
  const [touched, setTouched] = useState(false);
  const hasError = errors && touched;

  function handleChange(value) {
    console.log(value)
    onChange(value);
  }

  function handleBlur() {
    setTouched(true);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.control}>
        <TextCommonsMedium
          style={[
            styles.textStyle,
            { color: hasError ? Colors.redError : Colors.mJordan },
          ]}
        >
          {isConsulting ? "está" : label}
        </TextCommonsMedium>

        {isConsulting && <View style={{ width: 20, border: 1, height: 10 }} />}

        <View style={styles.inputContainer}>
          <NumericInput
            containerStyle={[
              styles.input,
              { shadowColor: hasError ? Colors.redError : Colors.mJordan },
            ]}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            inputStyle={{ color: hasError ? Colors.redError : Colors.mJordan }}
            onBlur={handleBlur}
          />
          <TextCommonsRegular
            style={[
              styles.unitStyle,
              { color: hasError ? Colors.redError : Colors.mJordan },
            ]}
          >
            {unit}
          </TextCommonsRegular>
        </View>
      </View>
      {hasError && (
        <TextCommonsMedium style={styles.errorText}>{errors}</TextCommonsMedium>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: 310,
    paddingRight: 10,
  },

  control: {
    flexDirection: "row",
    alignItems: "center",
  },

  textStyle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1.1,
    //paddingRight: 12,
  },

  inputContainer: {
    flex: 0.9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
  },

  unitStyle: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },

  input: {
    flex: 1,
  },

  errorText: {
    color: Colors.redError,
    fontSize: 16,
    marginTop: 10,
  },
});
