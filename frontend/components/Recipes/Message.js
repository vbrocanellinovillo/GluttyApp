import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Image } from "react-native";
import { gluttyChef } from "../../constants/glutty";
import { useSelector } from "react-redux";
import Animated, { FadeIn } from "react-native-reanimated";
import AnimatedText from "../UI/Loading/AnimatedText";

const MESSAGE_FONT_SIZE = 18;

export default function Message({ message, isLoading, isError }) {
  const username = useSelector((state) => state.auth?.userData?.username);

  const isAnswer = message?.isAnswer;

  return (
    <Animated.View
      style={{ alignItems: isAnswer ? "stretch" : "flex-end" }}
      entering={FadeIn}
    >
      {isAnswer ? (
        <TextCommonsRegular
          style={[styles.textTop, styles.gluttyBotText, styles.gluttyText]}
        >
          Glutty
          <TextCommonsRegular
            style={[styles.textTop, styles.gluttyBotText, styles.botText]}
          >
            Bot
          </TextCommonsRegular>
        </TextCommonsRegular>
      ) : (
        <TextCommonsRegular style={[styles.textTop, styles.userText]}>
          Tu - {username}
        </TextCommonsRegular>
      )}

      <View style={[styles.container, { width: isAnswer ? "90%" : "70%" }]}>
        {isLoading && message?.isAnswer ? (
          <AnimatedText
            duration={550}
            initialColor={Colors.locro}
            changedColor={Colors.vainilla}
            textStyle={{ fontSize: MESSAGE_FONT_SIZE }}
          >
            {message?.content}
          </AnimatedText>
        ) : (
          <TextCommonsRegular style={styles.text}>
            {message?.content}
          </TextCommonsRegular>
        )}

        <View
          style={[
            styles.triangle,
            {
              right: !isAnswer && 5,
              transform: [{ rotate: !isAnswer ? "330deg" : "0deg" }],
              display: isAnswer && "none",
            },
          ]}
        />
      </View>

      <TextCommonsRegular
        style={[styles.timeText, { marginRight: isAnswer ? 55 : 18 }]}
      >
        {message?.time}
      </TextCommonsRegular>

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

  text: {
    color: "white",
    fontSize: MESSAGE_FONT_SIZE,
  },

  triangle: {
    position: "absolute",
    bottom: -10,
    width: 0,
    height: 0,
    borderTopWidth: 25,
    borderTopColor: "transparent",
    borderBottomWidth: 25,
    borderBottomColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: Colors.roca,
    zIndex: 0,
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

  textTop: {
    marginBottom: 4,
  },

  gluttyBotText: {
    fontSize: 22,
    fontWeight: "600",
    marginLeft: 10,
  },

  gluttyText: {
    color: Colors.mJordan,
  },

  botText: {
    color: Colors.locro,
  },

  userText: {
    fontSize: 18,
    marginRight: 16,
  },

  timeText: {
    textAlign: "right",
    marginTop: 4,
    color: "#666",
    fontSize: 14,
  },
});
