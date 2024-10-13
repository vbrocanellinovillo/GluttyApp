import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { gluttyGreeting } from "../../constants/glutty";
import { useSelector } from "react-redux";

export default function WelcomeMessage() {
  const name = useSelector((state) => state.auth.userData?.first_name);

  return (
    <View style={styles.shadow}>
      <LinearGradient
        style={styles.container}
        colors={[Colors.humita, Colors.locro]}
      >
        <TextCommonsMedium style={styles.message}>
          Hola {name || "Glutty Usuario"}!
        </TextCommonsMedium>
        <View style={styles.imageContainer}>
          <Image source={{ uri: gluttyGreeting }} style={styles.image} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    borderRadius: 20,
  },

  container: {
    backgroundColor: Colors.locro,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
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
