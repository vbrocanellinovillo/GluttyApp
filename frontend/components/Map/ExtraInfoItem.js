import { View, StyleSheet } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";

export default function ExtraInfoItem({ isTrue, trueText, falseText }) {
  return (
    <View
      style={[
        styles.extraInfo,
        {
          backgroundColor: isTrue ? "green" : Colors.pielcita,
        },
      ]}
    >
      <TextCommonsMedium
        style={[{ color: isTrue ? Colors.whiteGreen : Colors.mJordan }]}
      >
        {isTrue ? trueText : falseText}
      </TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  extraInfo: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10
  },
});
