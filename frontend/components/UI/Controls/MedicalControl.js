import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import FormControl from "./FormControl";
import NumericInput from "./NumericInput";

export default function MedicalControl({ label, unit }) {
  return (
    <View style={styles.control}>
      <TextCommonsMedium style={styles.textStyle}>{label}</TextCommonsMedium>
      <View style={styles.inputContainer}>
        <NumericInput containerStyle={styles.input}/>
        <TextCommonsRegular style={styles.unitStyle}>{unit}</TextCommonsRegular>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4
  },

  textStyle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1.4,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 16,
  },

  unitStyle: {
    fontSize: 18,
    fontWeight: "400",
    flex: 1,
  },

  input: {
    flex: 1,
  },
});
