import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { getMonthName } from "../../utils/dateFunctions";


export default function MedicalExamDateViewer({date}) {

    const [year, monthNumber, day] = date.split("-");

    const month = getMonthName(monthNumber);

    return (
        <View style={styles.dateContainer}>
          <TextCommonsMedium style={styles.dateText}>{month}</TextCommonsMedium>
          <TextCommonsMedium style={[styles.dateText, { fontSize: 30 }]}>
            {day}
          </TextCommonsMedium>
          <TextCommonsMedium style={styles.dateText}>{year}</TextCommonsMedium>
        </View>
    )
}

const styles = StyleSheet.create({
    dateContainer: {
        alignItems: "center",
      },
    
    dateText: {
        fontSize: 16,
        fontWeight: "600",
      },
})