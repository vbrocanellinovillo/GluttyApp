import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import AddButton from "../UI/Controls/AddButton";

export default function AddMedicalExamButton() {
  const navigation = useNavigation();

  function navigateNewMedicalExam() {
    //ver
    navigation.navigate("BloodTest");
  }

  return <AddButton onPress={navigateNewMedicalExam}>Nuevo Estudio</AddButton>;
}
