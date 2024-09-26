import { Image, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { thumbGlutty } from "../../constants/glutty";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function NoNextStudy() {
  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.text}>
        Configura tu recordatorio
      </TextCommonsMedium>
      <MaterialCommunityIcons
        name="arrow-right-bottom"
        size={32}
        color={Colors.mJordan}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  text: {
    fontSize: 24,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  icon: {
    textAlign: "right",
  },
});
