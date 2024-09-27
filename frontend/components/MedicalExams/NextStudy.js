import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import NextStudyDate from "./NextStudyDate";

export default function NextStudy({ date }) {
  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.title}>
        Tiempo hasta tu proximo estudio médico
      </TextCommonsMedium>
      <NextStudyDate date={date} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    gap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: Colors.mJordan,
  },
});
