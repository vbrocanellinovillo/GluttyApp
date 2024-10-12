import { Image, StyleSheet, View } from "react-native";
import BlurGraphic from "./BlurGraphic";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { thumbGlutty } from "../../constants/glutty";
import { Colors } from "../../constants/colors";
import SectionContainer from "../UI/SectionContainer";

export default function NoStatistics({ width, height, blurStyle, innerStyle }) {
  return (
    <SectionContainer style={styles.container}>
      <BlurGraphic
        width={width}
        height={height}
        style={blurStyle}
        intensity={25}
      >
        <View style={[styles.innerContainer, innerStyle]}>
          <Image source={{ uri: thumbGlutty }} style={styles.image} />
          <TextCommonsMedium style={styles.text}>
            Comienza a cargar tus estudios para visualizar tus estadisticas!
          </TextCommonsMedium>
        </View>
      </BlurGraphic>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  innerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: 10,
    paddingHorizontal: 24,
    paddingBottom: 10,
  },

  image: {
    width: 110,
    height: 110,
    objectFit: "contain",
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
  },
});
