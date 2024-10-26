import { Dimensions, StyleSheet, View } from "react-native";
import RecipesInput from "../../../components/Recipes/RecipesInput";
import { useState } from "react";
import Messages from "../../../components/Recipes/Messages";
import * as Haptics from "expo-haptics";
import { Message } from "../../../models/Message";

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

  async function handleSend() {
    if (textValue.trim().length === 0) {
      return;
    }

    const now = new Date();

    const time = `${now.getHours()}:${now.getMinutes()}`;

    const newMessage = new Message(messages.length, textValue, false, time);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextValue("");
    await sendMessage();
  }

  async function sendMessage() {
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height * 0.12,
    paddingHorizontal: width * 0.03,
  },
});
