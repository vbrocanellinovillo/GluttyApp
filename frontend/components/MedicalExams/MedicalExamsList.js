import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MedicalExamItem from "./MedicalExamsItem";

export default function MedicalExamsList({ medicalExmas }) {
  const navigation = useNavigation();

  /*const handlePress = (branch) => {

    navigation.navigate("Consultar Sucursal", {branch});
  };*/

  return (
    <FlatList
      data={medicalExmas}
      renderItem={({ item }) => <MedicalExamItem medicalExam={item} />}
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
