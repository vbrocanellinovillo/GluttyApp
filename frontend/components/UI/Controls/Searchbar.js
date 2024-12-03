import { Input } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../../constants/colors";
import Animated from "react-native-reanimated";
import { useEffect, useRef } from "react";

export default function Searchbar({
  value = "",
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
  placeholderTextColor = "#888",
  containerStyle,
  sharedTransitionTag,
  sharedTransitionStyle,
  unfocus,
  focused,
  disableKeyboard,
}) {
  const hasSearchTerm = value.trim().length !== 0;
  const icon = hasSearchTerm ? closeIcon : searchIcon;

  const inputRef = useRef();

  useEffect(() => {
    if (focused) {
      inputRef?.current.focus();
    }
  }, [focused]);

  function handleChange(text) {
    onChange && onChange(text);
  }

  function handleBlur() {
    onBlur && onBlur();
  }

  function handleFocus() {
    onFocus && onFocus();
    unfocus && inputRef?.current.blur();
  }

  return (
    <Animated.View
      style={containerStyle}
      sharedTransitionTag={sharedTransitionTag}
      sharedTransitionStyle={sharedTransitionStyle}
    >
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
        ref={inputRef}
        showSoftInputOnFocus={!disableKeyboard}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 26,
    borderBottomWidth: 0,
  },
});
