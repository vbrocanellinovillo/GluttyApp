import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import FormControl from "./FormControl";

export default function MedicalControl({ label, unit }) {
  return (
    <View style={styles.control}>
      <TextCommonsMedium>{label}</TextCommonsMedium>
      <FormControl />
      <TextCommonsRegular>{unit}</TextCommonsRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  control: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
