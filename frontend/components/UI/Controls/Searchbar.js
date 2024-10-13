import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function Searchbar({
  value,
  placeholder = "Search",
  style,
  onClear = () => undefined,
  onChange = (text) => undefined,
  onFocus = () => undefined,
  onBlur = () => undefined,
  closeIcon = "close",
  searchIcon = "search",
  typeIcon = "ionicons",
  iconStyle,
  placeholderTextColor = "#888"
}) {
  const hasSearchTerm = value.trim().length !== 0;
  const icon = hasSearchTerm ? closeIcon : searchIcon;

  function handleChange(text) {
    onChange && onChange(text);
  }

  function handleBlur() {
    onBlur && onBlur();
  }

  function handleFocus() {
    onFocus && onFocus();
  }

  return (
    <Input
      inputContainerStyle={[styles.search, style]}
      rightIcon={{
        type: typeIcon,
        name: `${icon}`,
        color: Colors.mJordan,
        size: 30,
        onPress: onClear,
        style: iconStyle,
      }}
      value={value}
      onChangeText={handleChange}
      placeholder={placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholderTextColor={placeholderTextColor}
    />
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 26,
  },
});
