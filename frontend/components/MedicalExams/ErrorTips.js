import { Image, StyleSheet } from "react-native";
import { View } from "react-native";
import { mechanicGlutty } from "../../constants/glutty";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";

export default function ErrorTips({ children, height }) {
  const dimentions = height * 0.65;

  return (
    <View style={[styles.container, { height }]}>
      <Image
        source={{ uri: mechanicGlutty }}
        style={[styles.image, { width: dimentions, height: dimentions }]}
      />
      <TextCommonsMedium style={styles.text}>{children}</TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 30,
  },

  image: {
    width: 200,
    height: 200,
    objectFit: "contain",
  },

  text: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
