import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MedicalExamItem from "./MedicalExamsItem";
import ViewMedicalExam from "../../screens/User/MedicalExams/ViewMedicalExam";

export default function MedicalExamsList({ medicalExmas }) {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate("ViewMedicalExam", {id});
  };

  return (
    <FlatList
      data={medicalExmas}
      renderItem={({ item }) => <MedicalExamItem medicalExam={item} onPress={() => handlePress(item.id)}/>}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random())}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
    paddingBottom: 30,
  },
});
