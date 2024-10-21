import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { sadGlutty } from "../../constants/glutty";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

export default function NoSearchResults({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.textIcon}>
        <Ionicons name="close-circle" color={Colors.redError} size={26} />
        <TextCommonsMedium style={styles.text}>{children}</TextCommonsMedium>
      </View>
      <Image source={{ uri: sadGlutty }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  textIcon: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  image: {
    width: 80,
    height: 80,
    objectFit: "contain",
    flex: 1,
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
  },
});
