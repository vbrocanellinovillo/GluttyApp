import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { RadioButton } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import * as Haptics from "expo-haptics";

export default function RadioButtonsControl({
  title,
  options,
  onValueChange,
  value,
}) {
  function handleValueChange(value) {
    Haptics.selectionAsync();
    onValueChange(value);
  }

  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.title}>{title}</TextCommonsMedium>
      <RadioButton.Group onValueChange={handleValueChange} value={value}>
        {options.map((option, index) => (
          <RadioButton.Item
            key={index}
            mode="android"
            label={option.label}
            value={option.value}
            labelStyle={styles.labelStyle}
            labelVariant="titleMedium"
            color={Colors.locro}
          />
        ))}
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  labelStyle: {
    color: Colors.mJordan,
  },
});
