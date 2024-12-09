import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import NextStudyDate from "./NextStudyDate";
import { getTimeDifference } from "../../utils/dateFunctions";

export default function NextStudy({ date }) {
  //const { years, months, days } = getTimeDifference(date);

  return (
    <View style={styles.container}>
      <TextCommonsMedium style={styles.title}>
        Tiempo hasta tu próximo estudio médico
      </TextCommonsMedium>
      <NextStudyDate year={date?.years} month={date?.months} days={date?.days} />
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
