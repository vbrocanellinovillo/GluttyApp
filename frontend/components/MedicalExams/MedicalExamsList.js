import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MedicalExamItem from "./MedicalExamsItem";
import NoMedicalExams from "./NoMedicalExams";
import { useRefresh } from "../../hooks/useRefresh";

export default function MedicalExamsList({ medicalExams, onRefresh }) {
  const navigation = useNavigation();

  const handlePress = (id) => {
    navigation.navigate("ViewMedicalExam", { id });
  };

  const { refreshing, handleRefresh } = useRefresh(onRefresh);

  return (
    <FlatList
      data={medicalExams}
      renderItem={({ item }) => (
        <MedicalExamItem
          medicalExam={item}
          onPress={() => handlePress(item.id)}
        />
      )}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random())}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<NoMedicalExams />}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      contentInset={{ bottom: 200 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 30,
  },
});
