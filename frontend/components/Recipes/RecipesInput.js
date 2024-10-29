import { Input } from "@rneui/themed";
import { Dimensions, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

const height = Dimensions.get("window").height;

export default function RecipesInput({
  placeholder,
  inputStyle,
  containerStyle,
  textStyle,
  typeIcon = "ionicons",
  onPress = () => undefined,
  onChange = () => undefined,
  iconStyle,
  value = "",
  isSending
}) {
  const hasText = value.trim().length > 0;

  const icon = isSending? "stop-circle" : "send"

  function handleChange(text) {
    onChange && onChange(text);
  }

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={height * 0.15}
      style={containerStyle}
    >
      <Input
        inputContainerStyle={[styles.control, inputStyle]}
        style={textStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={handleChange}
        rightIcon={{
          type: typeIcon,
          name: `${icon}`,
          color: hasText ? Colors.mJordan : "#aaa",
          size: 24,
          onPress: onPress,
          style: iconStyle,
          disabled: !hasText,
          disabledStyle: { backgroundColor: "transparent" },
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  control: {
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 26,
    fontSize: 22,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 0 },
    borderBottomWidth: 0,
  },
});
