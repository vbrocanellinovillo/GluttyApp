import { Dimensions, StyleSheet, View } from "react-native";
import RecipesInput from "../../../components/Recipes/RecipesInput";
import DismissKeyboardContainer from "../../../components/UI/Forms/DismissKeyboadContainer";
import { useState } from "react";
import Messages from "../../../components/Recipes/Messages";
import * as Haptics from "expo-haptics";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Recipes() {
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleChange(text) {
    setTextValue(text);
  }

  function handleSend() {
    setIsLoading(true);
    try {
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  function handleCancel() {}

  function handlePress() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!isLoading) {
      handleSend();
    } else {
      handleCancel();
    }
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <Messages messages={messages} isLoading={isLoading} isError={isError} />
        <RecipesInput
          value={textValue}
          onChange={handleChange}
          placeholder="¿Que piensas comer hoy?"
          isSending={isLoading}
          onPress={handlePress}
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
