import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Image } from "react-native";
import { gluttyChef } from "../../constants/glutty";
import Animated, { FadeIn } from "react-native-reanimated";
import MessageContent from "./MessageContent";
import Sender from "./Sender";
import TriangleResponse from "./TriangleResponse";
import TimeText from "./TimeText";

export default function Message({
  message,
  isLoading,
  isError,
  isTyping,
  handleFinishTyping,
}) {
  const isAnswer = message?.isAnswer;

  return (
    <Animated.View
      style={{ alignItems: isAnswer ? "stretch" : "flex-end" }}
      entering={FadeIn}
    >
      <Sender isAnswer={isAnswer} />
      <View style={[styles.container, { width: isAnswer ? "90%" : "70%" }]}>
        <MessageContent
          isLoading={isLoading}
          isError={isError}
          isAnswer={isAnswer}
          typing={isTyping}
          handleFinishTyping={handleFinishTyping}
        >
          {message?.content}
        </MessageContent>
        <TriangleResponse isAnswer={isAnswer} />
      </View>

      <TimeText isAnswer={isAnswer}>{message?.time}</TimeText>

      {isAnswer && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: gluttyChef }} style={styles.image} />
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.roca,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 30,
    position: "relative",
    paddingBottom: 40,
    shadowColor: "#444",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },

  imageContainer: {
    position: "absolute",
    width: 65,
    height: 65,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.oceanBlue,
    left: -25,
    bottom: -20,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});
