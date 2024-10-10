import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import BlurGraphic from "./BlurGraphic";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function ErrorGraphic({ width, height }) {
  return (
    <BlurGraphic width={width} height={height}>
      <View style={styles.container}>
        <Ionicons name="close-circle" size={34} color={Colors.redError} />
        <TextCommonsMedium style={styles.text}>
          Ocurrio un error. Por favor intente de nuevo más tarde
        </TextCommonsMedium>
      </View>
    </BlurGraphic>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 10
  },

  text: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.mJordan,
    textAlign: "center",
  },
});
