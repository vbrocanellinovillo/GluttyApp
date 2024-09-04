/*import { StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import { Colors } from "../../../constants/colors";
import { useFonts } from "expo-font";

export default function CheckboxControl({
  title,
  checked,
  setChecked,
  name,
  style,
  textStyle,
}) {
  const [loaded, error] = useFonts({
    "TT-Commons-Regular": require("../../../assets/fonts/TT Commons Regular.otf"),
  });

  return (
    <CheckBox
      title={title}
      checked={checked}
      checkedColor={Colors.mJordan}
      onPress={() => setChecked(name, !checked)}
      containerStyle={[styles.checkbox, style]}
      textStyle={[
        styles.textStyle,
        { fontFamily: "TT-Commons-Regular" },
        textStyle,
      ]}
      uncheckedColor={Colors.mJordan}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: "white",
    fontSize: 16,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: Colors.mJordan,
    marginLeft: 0,
    paddingVertical: 13,
    width: "100%",
  },

  textStyle: {
    fontSize: 20,
    color: Colors.mJordan,
  },
});*/

import { StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import { Colors } from "../../../constants/colors";
import { useFonts } from "expo-font";

export default function CheckboxControl({
  title,
  checked,
  setChecked,
  name,
  style,
  textStyle,
  editable = true, // Nueva propiedad editable con valor por defecto true
}) {
  const [loaded, error] = useFonts({
    "TT-Commons-Regular": require("../../../assets/fonts/TT Commons Regular.otf"),
  });

  return (
    <CheckBox
      title={title}
      checked={checked}
      checkedColor={Colors.mJordan}
      onPress={editable ? () => setChecked(name, !checked) : null} // Deshabilita onPress si no es editable
      containerStyle={[styles.checkbox, style]}
      textStyle={[
        styles.textStyle,
        { fontFamily: "TT-Commons-Regular" },
        textStyle,
      ]}
      uncheckedColor={Colors.mJordan}
    />
  );
}

const styles = StyleSheet.create({
  checkbox: {
    backgroundColor: "white",
    fontSize: 15,
    marginVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    borderColor: Colors.mJordan,
    marginLeft: 0,
    paddingVertical: 13,
    width: "100%",
  },

  textStyle: {
    fontSize: 17,
    color: Colors.mJordan,
  },
});
