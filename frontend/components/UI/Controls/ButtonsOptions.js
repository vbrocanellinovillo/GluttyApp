import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import { useState } from "react";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";

export default function ButtonsOptions({
  options,
  onSelect,
  selectedColor,
  defaultColor,
  containerStyle,
  optionStyle,
  textStyle,
  selectedTextStyle,
}) {
  const [selectedOption, setSelectedOption] = useState(1);

  function selectOption(id) {
    setSelectedOption(id);
    onSelect && onSelect(id);
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {options &&
        options.map((option) => (
          <Pressable
            style={[
              styles.option,
              optionStyle,
              {
                backgroundColor:
                  selectedOption == option.id ? selectedColor : defaultColor,
              },
            ]}
            key={option.id}
            onPress={selectOption.bind(this, option.id)}
          >
            <TextCommonsRegular
              style={[
                styles.optionText,
                textStyle,
                selectedOption == option.id && selectedTextStyle,
              ]}
            >
              {option.value}
            </TextCommonsRegular>
          </Pressable>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    backgroundColor: Colors.locro,
    padding: 5,
    borderRadius: 6,
  },

  option: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },

  optionText: {
    fontSize: 16,
  },
});
