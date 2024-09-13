import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { getMonthName } from "../../utils/dateFunctions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "../UI/Controls/Button";

export default function MedicalExamItem({ medicalExam, onPress }) {
  const date = new Date(medicalExam.date);

  const day = date.getDay();
  const year = date.getFullYear();

  const monthNumber = date.getMonth();
  const month = getMonthName(monthNumber);

  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.item, styles.pressed] : styles.item
      }
      onPress={onPress}
    >
      <View style={styles.detailsContainer}>
        <View style={styles.dateContainer}>
          <TextCommonsMedium style={styles.dateText}>{month}</TextCommonsMedium>
          <TextCommonsMedium style={[styles.dateText, { fontSize: 30 }]}>
            {day}
          </TextCommonsMedium>
          <TextCommonsMedium style={styles.dateText}>{year}</TextCommonsMedium>
        </View>

        <View style={styles.icons}>
          <View style={styles.iconContainer}>
            <FontAwesome5 name="hospital" size={22} color="black" />
            <TextCommonsMedium style={styles.iconText}>
              {medicalExam.hospital}
            </TextCommonsMedium>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome6 name="user-doctor" size={22} color="black" />
            <TextCommonsMedium style={styles.iconText}>
              {medicalExam.dr}
            </TextCommonsMedium>
          </View>
        </View>
      </View>
      <Button backgroundColor={Colors.locro} textStyle={styles.buttonText}>
        Ver detalles
      </Button>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
    shadowColor: "#222",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    backgroundColor: "white",
    padding: 20,
    gap: 10,
  },

  pressed: {
    opacity: 0.6,
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    flex: 1,
    paddingRight: 50,
  },

  textContainer: {
    gap: 7,
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  address: {
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "italic",
    color: Colors.mJordan,
  },

  dateContainer: {
    alignItems: "center",
  },

  dateText: {
    fontSize: 16,
    fontWeight: "600",
  },

  icons: {
    gap: 12,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 2,
  },

  iconText: {
    fontSize: 20,
    fontWeight: "500",
  },

  buttonText: { fontWeight: "400", fontSize: 16 },
});
