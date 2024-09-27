import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function NextStudyDateItem({ number, text }) {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <TextCommonsMedium style={styles.number}>{number}</TextCommonsMedium>
      </View>
      <TextCommonsMedium style={styles.text}>{text}</TextCommonsMedium>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
  },

  numberContainer: {
    paddingVertical: 16,
    backgroundColor: Colors.oceanBlue,
    borderRadius: 14,
  },

  number: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.lightOcean,
    textAlign: "center",
  },

  text: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
  },
});
