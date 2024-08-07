import { StyleSheet, View, Image } from "react-native";
import { mechanicGlutty, thumbGlutty } from "../../constants/glutty";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";

export default function GluttyErrorScreen({
  width,
  height,
  children,
  textStyle,
  style,
}) {
  return (
    <View style={[styles.gluttyContainer, style]}>
      <Image
        source={{
          uri: mechanicGlutty,
        }}
        style={[styles.image, { width, height }, textStyle]}
      />
      <TextCommonsMedium style={styles.text}>{children}</TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  gluttyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  image: {
    objectFit: "contain",
  },

  text: {
    fontSize: 22,
    fontStyle: "italic",
    fontWeight: "400",
  },
});
