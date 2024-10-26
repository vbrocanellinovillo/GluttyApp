import {
  Dimensions,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RecipesInput from "../../../components/Recipes/RecipesInput";
import DismissKeyboardContainer from "../../../components/UI/Forms/DismissKeyboadContainer";
import { useState } from "react";
import Messages from "../../../components/Recipes/Messages";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Recipes() {
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);

  function handleChange(text) {
    setTextValue(text);
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <Messages messages={messages} />
        <RecipesInput
          value={textValue}
          onChange={handleChange}
          placeholder="¿Que piensas comer hoy?"
        />
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: height * 0.12,
    paddingTop: height * 0.03,
    paddingHorizontal: width * 0.03,
  },
});
