import { StyleSheet, Text, View } from "react-native";
import TextCommonsMedium from "./FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "./FontsTexts/TextCommonsRegular";
import { Colors } from "../../constants/colors";

export default function DetailWithTitle({
  title,
  titleStyle,
  textStyle,
  containerStyle,
  children,
  numberOfLines,
}) {
  return (
    <View style={[containerStyle]}>
      <TextCommonsMedium style={[styles.title, titleStyle]}>
        {title}
      </TextCommonsMedium>
      <TextCommonsRegular
        style={[styles.text, textStyle]}
        numberOfLines={numberOfLines}
      >
        {children}
      </TextCommonsRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  text: {
    fontSize: 13,
  },
});
