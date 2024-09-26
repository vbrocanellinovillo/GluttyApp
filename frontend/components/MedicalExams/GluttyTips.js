import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";
import SectionContainer from "../UI/SectionContainer";

export default function GluttyTips({ onPress }) {
  return (
    <SectionContainer style={styles.container} onPress={onPress}>
      <TextCommonsMedium style={styles.title}>Glutty TIPs!</TextCommonsMedium>
      <View style={styles.content}>
        <TextCommonsRegular style={styles.text}>
          Mejorá tus habitos!
        </TextCommonsRegular>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1726350329/image-90_cxl0x3.webp",
          }}
          style={styles.image}
        />
      </View>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "flex-start",
  },

  pressed: {
    opacity: 0.6,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.mJordan,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  image: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },

  text: {
    fontSize: 18,
    textAlign: "center",
    flex: 0.8,
  },
});
