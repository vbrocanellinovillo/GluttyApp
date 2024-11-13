import { View, Image, StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";
import { gluttyChef } from "../../constants/glutty";

export default function GluttyBotTitle() {
  return (
    <View style={styles.gluttyBotSection}>
      <Image source={{ uri: gluttyChef }} style={styles.image} />
      <View style={styles.titleSection}>
        <TextCommonsMedium style={[styles.title, styles.glutty]}>
          Glutty <TextCommonsMedium style={styles.bot}>Bot</TextCommonsMedium>
        </TextCommonsMedium>
        <TextCommonsRegular style={styles.text}>
          ¿En qué puedo ayudarte hoy?
        </TextCommonsRegular>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gluttyBotSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },

  image: {
    width: 120,
    height: 140,
    objectFit: "contain",
  },

  titleSection: {
    alignItems: "center",
    gap: 8,
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
  },

  glutty: {
    color: Colors.mJordan,
  },

  bot: {
    color: Colors.locro,
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.mJordan,
  },
});
