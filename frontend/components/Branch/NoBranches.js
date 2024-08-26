import { Image, StyleSheet, View } from "react-native";
import { thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function NoBranches() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: thumbGlutty }} />
      <TextCommonsMedium style={styles.text}>
        Aún no tiene sucursales cargadas.
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 80
  },

  image: {
    width: 250,
    height: 250,
  },

  text: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: 30
  },
});
