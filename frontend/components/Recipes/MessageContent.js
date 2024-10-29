import AnimatedText from "../UI/Loading/AnimatedText";
import TypeWriter from "react-native-typewriter";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { StyleSheet } from "react-native";
import { MESSAGE_FONT_SIZE } from "../../constants/chatbot";
import { Colors } from "../../constants/colors";

export default function MessageContent({
  isAnswer,
  isLoading,
  isError,
  children,
}) {
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
      ) : isAnswer ? (
        <TypeWriter typing={1} style={styles.text}>
          {children}
        </TypeWriter>
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
