import AnimatedText from "../UI/Loading/AnimatedText";
import TypeWriter from "react-native-typewriter";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { StyleSheet, View } from "react-native";
import { MESSAGE_FONT_SIZE } from "../../constants/chatbot";
import { Colors } from "../../constants/colors";
import ErrorResponse from "./ErrorResponse";
import { useEffect } from "react";
import SaveMessage from "./SaveMessage";

export default function MessageContent({
  isAnswer,
  isLoading,
  isError,
  children,
  typing = 1,
  handleFinishTyping,
  onSave,
}) {
  function handleFinish() {
    handleFinishTyping && handleFinishTyping();
  }

  useEffect(() => {
    if (isError) {
      handleFinish();
    }
  }, [isError]);

  return (
    <>
      {isLoading && isAnswer ? (
        <AnimatedText
          duration={550}
          initialColor={Colors.locro}
          changedColor={Colors.vainilla}
          textStyle={{ fontSize: MESSAGE_FONT_SIZE }}
        >
          {children}
        </AnimatedText>
      ) : isAnswer && isError ? (
        <ErrorResponse />
      ) : isAnswer ? (
        <>
          <TypeWriter
            typing={typing}
            style={styles.text}
            maxDelay={0.1}
            initialDelay={0.1}
            onTypingEnd={handleFinish}
          >
            {children}
          </TypeWriter>
          {typing === 0 && <SaveMessage onSave={onSave} />}
        </>
      ) : (
        <TextCommonsRegular style={styles.text}>{children}</TextCommonsRegular>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: MESSAGE_FONT_SIZE,
    color: "white",
  },
});
