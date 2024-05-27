import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Dropdown } from "react-native-element-dropdown";

export default function Combobox({
  placeholder,
  data,
  onChange,
  value,
  handleBlur,
  name,
  errors,
  touched,
}) {
  function changeHandler(item) {
    onChange(item.value);
  }

  return (
    <View style={styles.container}>
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        style={
          touched && errors
            ? [styles.combobox, styles.formError]
            : styles.combobox
        }
        onChange={changeHandler}
        placeholder={placeholder}
        placeholderStyle={
          touched && errors ? { color: Colors.redError } : { color: "#aaa" }
        }
        onBlur={() => handleBlur(name)}
      />

      {errors && touched && <Text style={styles.errorText}>{errors}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 12,
  },

  combobox: {
    height: 50,
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
