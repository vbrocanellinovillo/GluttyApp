import { Input } from "@rneui/themed";
import { Dimensions, KeyboardAvoidingView, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import * as Haptics from "expo-haptics";

const height = Dimensions.get("window").height;

export default function RecipesInput({
  placeholder,
  inputStyle,
  containerStyle,
  textStyle,
  typeIcon = "ionicons",
  onSend = () => undefined,
  onChange = () => undefined,
  onCancel = () => undefined,
  iconStyle,
  value = "",
  isTyping,
}) {
  const hasText = value.trim().length > 0;

  const icon = isTyping ? "stop-circle" : "send";

  function handleChange(text) {
    onChange && onChange(text);
  }

  function handlePressIcon() {
    Haptics.selectionAsync();
    isTyping ? onCancel() : onSend();
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
          color: hasText || isTyping ? Colors.mJordan : "#aaa",
          size: 24,
          onPress: handlePressIcon,
          style: iconStyle,
          disabled: !hasText && !isTyping,
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
