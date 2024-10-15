import { StyleSheet, View, Image } from "react-native";
import { useSelector } from "react-redux";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { gluttyGreeting } from "../../constants/glutty";
import { Colors } from "../../constants/colors";

export default function WelcomeMessage() {
  const name = useSelector((state) => state.auth.userData?.first_name);
  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.message}>
        Hola {name || "Glutty Usuario"}!
      </TextCommonsMedium>
      <View style={styles.imageContainer}>
        <Image source={{ uri: gluttyGreeting }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },

  message: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  imageContainer: {
    overflow: "hidden",
    alignItems: "flex-end",
  },

  image: {
    width: 100,
    height: 100,
    objectFit: "contain",
  },
});
