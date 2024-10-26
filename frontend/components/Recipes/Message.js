import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Image } from "react-native";
import { gluttyChef } from "../../constants/glutty";
import { useSelector } from "react-redux";

export default function Message({ isAnswer }) {
  const username = useSelector((state) => state.auth?.userData?.username);

  return (
    <View style={{ alignItems: isAnswer ? "stretch" : "flex-end" }}>
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
        <TextCommonsRegular style={styles.text}>
          mensaje choto
        </TextCommonsRegular>

        <View
          style={[
            styles.triangle,
            {
              right: !isAnswer && 5,
              left: isAnswer && 5,
              transform: [{ rotate: isAnswer ? "-145deg" : "330deg" }],
            },
          ]}
        />
      </View>

      <TextCommonsRegular
        style={[styles.timeText, { marginRight: isAnswer ? 55 : 18 }]}
      >
        18:59
      </TextCommonsRegular>

      {isAnswer && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: gluttyChef }} style={styles.image} />
        </View>
      )}
    </View>
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
  },

  text: {
    color: "white",
    fontSize: 18,
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
    left: -30,
    bottom: -30,
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
    fontSize: 14
  },
});
