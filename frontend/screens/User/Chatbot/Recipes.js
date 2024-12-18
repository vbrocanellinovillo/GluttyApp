import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import RecipesInput from "../../../components/Recipes/RecipesInput";
import { useState } from "react";
import Messages from "../../../components/Recipes/Messages";
import { Message } from "../../../models/Message";
import { useSelector } from "react-redux";
import { enviarConsultaChatbot } from "../../../services/chatbotService";
import InitialMessages from "../../../components/Recipes/InitialMessages";

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

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

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

      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const time = `${hours}:${minutes}`;

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

  async function handleFilter(filter) {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;

    const newMessage = new Message(messages.length, filter, false, time);
    const prompt = filter;

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

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="height"
        keyboardVerticalOffset={height * 0.15}
      >
        {messages?.length > 0 ? (
          <Messages
            messages={messages}
            isLoading={isLoading}
            isError={isError}
            isTyping={isTyping}
            handleFinishTyping={handleCancel}
            focusedInput={focusedInput}
          />
        ) : (
          <InitialMessages onFilter={handleFilter} />
        )}
        <RecipesInput
          value={textValue}
          onChange={handleChange}
          placeholder="¿Qué piensas comer hoy?"
          isTyping={isTyping}
          onSend={handleSend}
          onCancel={handleCancel}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.06,
  },
});
