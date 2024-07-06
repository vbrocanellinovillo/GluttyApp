import { Keyboard, TouchableWithoutFeedback, View } from "react-native";

export default function DismissKeyboardContainer({ children }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
}
