import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function Tip({ tip }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: tip.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <TextCommonsMedium style={styles.title}>{tip.title}</TextCommonsMedium>
        <TextCommonsRegular style={styles.description}>
          {tip.tip}
        </TextCommonsRegular>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 22,
  },

  image: {
    width: "100%",
    height: 160,
    objectFit: "fill",
    borderRadius: 18,
  },

  textContainer: {
    gap: 6,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.locro,
  },

  description: {
    fontSize: 18,
    color: Colors.mJordan,
    fontWeight: "400",
  },
});
