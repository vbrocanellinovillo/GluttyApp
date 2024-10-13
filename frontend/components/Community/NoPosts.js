import { Image, StyleSheet, View } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function NoPosts() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbGlutty }} style={styles.image} />
      <TextCommonsMedium style={styles.text}>
        Comienza a compartir tus posteos con la comunidad!
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
    paddingTop: 50,
    paddingHorizontal: 30,
  },

  image: {
    width: 180,
    height: 180,
    objectFit: "contain",
  },

  text: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
});
