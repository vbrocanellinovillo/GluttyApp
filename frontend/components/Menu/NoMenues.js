import { Image, StyleSheet, View } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";

export default function NoMenues() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextCommonsMedium style={styles.text}>
          Comienza a cargar tus menús!
        </TextCommonsMedium>
      </View>
      <Image source={{ uri: thumbGlutty }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    flex: 1,
    height: 180,
    objectFit: "contain",
  },

  textContainer: {
    flex: 1,
    alignItems: "flex-end",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
  },

  text: {
    justifyContent: "flex-end",
    fontSize: 18,
    color: Colors.mJordan,
  },
});
