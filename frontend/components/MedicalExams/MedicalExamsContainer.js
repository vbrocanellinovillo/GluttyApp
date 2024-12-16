import { StyleSheet, View } from "react-native";
import AddMedicalExamButton from "./AddMedicalExamButton";
import MedicalExamsList from "./MedicalExamsList";
import MedicalExamsSkeleton from "../UI/Loading/MedicalExamsSkeleton";
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";

export function MedicalExamsContainer({
  medicalExams = [],
  isLoading,
  isError,
  onRefresh,
}) {
  let content;

  if (isLoading) {
    content = <MedicalExamsSkeleton />;
  } else if (isError) {
    content = <ErrorFetchingMedicalExams onRefresh={onRefresh} />;
  } else {
    content = <MedicalExamsList medicalExams={medicalExams} />;
  }

  return (
    <View style={styles.container}>
      <AddMedicalExamButton />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 40,
  },
});
