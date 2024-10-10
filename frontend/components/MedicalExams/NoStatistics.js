import { Image, StyleSheet, View } from "react-native";
import BlurGraphic from "./BlurGraphic";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { thumbGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";

export default function NoStatistics({ width, height }) {
  return (
    <BlurGraphic width={width} height={height}>
      <View style={styles.container}>
        <Image source={{ uri: thumbGlutty }} style={styles.image} />
        <TextCommonsMedium style={styles.text}>
          Comienza a cargar tus estudios para visualizar tus estadisticas!
        </TextCommonsMedium>
      </View>
    </BlurGraphic>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },

  text: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.mJordan,
  },
});
