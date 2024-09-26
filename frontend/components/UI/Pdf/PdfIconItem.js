import { StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";
import { Colors } from "../../../constants/colors";

export default function PdfIconItem({
  name,
  iconSize,
  iconColor,
  textStyle,
  contentStyle,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.content, contentStyle]}>
        <FontAwesome
          name="file-pdf-o"
          size={iconSize || 32}
          color={iconColor || "red"}
        />
        <TextCommonsRegular style={[styles.textStyle, textStyle]}>
          {name}
        </TextCommonsRegular>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  content: {
    gap: 10,
    alignItems: "center",
    maxWidth: 80,
  },

  textStyle: {
    fontSize: 18,
    color: Colors.mJordan,
    fontWeight: "500",
  },
});
