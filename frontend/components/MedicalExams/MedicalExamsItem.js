import { Pressable, StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import { getMonthName } from "../../utils/dateFunctions";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Button from "../UI/Controls/Button";
import TextCommonsRegular from "../UI/FontsTexts/TextCommonsRegular";

export default function MedicalExamItem({ medicalExam, onPress }) {
  const [year, monthNumber, day] = medicalExam.date.split("-");

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
          <TextCommonsMedium style={styles.exam} numberOfLines={2}>
            {medicalExam.exam}
          </TextCommonsMedium>
          <View style={styles.iconContainer}>
            <FontAwesome5
              name="map-marker-alt"
              size={22}
              color={Colors.mJordan}
            />
            <TextCommonsRegular style={styles.iconText} numberOfLines={2}>
              {medicalExam.hospital}
            </TextCommonsRegular>
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
    gap: 20,
  },

  pressed: {
    opacity: 0.6,
  },

  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    flex: 1,
    paddingRight: 20,
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
    flexShrink: 1,
  },

  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 2,
  },

  exam: {
    fontSize: 18,
    color: Colors.mJordan,
    fontWeight: "600",
  },

  iconText: {
    fontSize: 18,
  },

  buttonText: {
    fontWeight: "400",
    fontSize: 16,
  },
});
