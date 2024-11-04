import {
  Dimensions,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import RecipesInput from "../../../components/Recipes/RecipesInput";
import { useState } from "react";
import Messages from "../../../components/Recipes/Messages";
import { Message } from "../../../models/Message";
import { useSelector } from "react-redux";
import { enviarConsultaChatbot } from "../../../services/chatbotService";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export default function Recipes() {
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([]);

  const token = useSelector((state) => state.auth?.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isTyping, setIsTyping] = useState(0);

  const [focusedInput, setFocusedInput] = useState(false);

  function handleChange(text) {
    setTextValue(text);
  }

  async function handleSend() {
    Keyboard.dismiss();
    if (textValue.trim().length === 0) {
      return;
    }

    const now = new Date();

    const time = `${now.getHours()}:${now.getMinutes()}`;

    const newMessage = new Message(messages.length, textValue, false, time);
    const prompt = textValue;

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTextValue("");

    setTimeout(() => {
      const analyzingMessage = new Message(
        messages.length + 1,
        "Analizando...",
        true,
        time
      );
      setMessages((prevMessages) => [...prevMessages, analyzingMessage]);
    }, 1000);

    await sendMessage(prompt);
  }

  async function sendMessage(prompt) {
    setIsLoading(true);
    try {
      const response = await enviarConsultaChatbot(prompt, token);

      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}`;

      setMessages((prevMessages) => {
        const updatedMessages = prevMessages;

        const chatbotResponse = new Message(
          response.id_response,
          response.response,
          true,
          time
        );

        updatedMessages[updatedMessages.length - 1] = chatbotResponse;
        return updatedMessages;
      });

      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsTyping(1);
      setIsLoading(false);
    }
  }

  function handleCancel() {
    setIsTyping(0);
  }

  function handleFocus() {
    setFocusedInput(true);
  }

  function handleBlur() {
    setFocusedInput(false);
  }

  return (
    <View style={styles.container}>
      <Messages
        messages={messages}
        isLoading={isLoading}
        isError={isError}
        isTyping={isTyping}
        handleFinishTyping={handleCancel}
        isInputFocued={focusedInput}
      />
      <RecipesInput
        value={textValue}
        onChange={handleChange}
        placeholder="¿Que piensas comer hoy?"
        isTyping={isTyping}
        onSend={handleSend}
        onCancel={handleCancel}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: height * 0.11,
    paddingHorizontal: width * 0.03,
  },
});
