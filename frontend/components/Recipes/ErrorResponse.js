import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { MESSAGE_FONT_SIZE } from "../../constants/chatbot";

export default function ErrorResponse() {
  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.text}>
        Ocurrio un error. Por favor intente de nuevo más tarde
      </TextCommonsMedium>
      <Ionicons name="alert-circle-outline" color={Colors.whiteRed} size={24} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
  },

  text: {
    fontSize: MESSAGE_FONT_SIZE,
    fontWeight: 900,
    color: Colors.whiteRed,
  },
});
