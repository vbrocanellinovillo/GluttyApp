import { StyleSheet, TouchableOpacity } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

export default function AddMedicalExamButton() {
  const navigation = useNavigation();

  function navigateNewMedicalExam() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    //ver
    navigation.navigate("BloodTest");
  }

  return (
    <TouchableOpacity style={styles.container} onPress={navigateNewMedicalExam}>
      <TextCommonsMedium style={styles.text}>Nuevo Estudio</TextCommonsMedium>
      <Ionicons
        name="add-circle-sharp"
        size={28}
        color={Colors.darkBlue}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.oceanBlue,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    shadowColor: Colors.darkBlue,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    color: Colors.darkBlue,
  },

  icon: {
    fontWeight: "bold",
  },
});
