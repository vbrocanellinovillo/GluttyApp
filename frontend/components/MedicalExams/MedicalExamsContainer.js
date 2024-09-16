import { StyleSheet, View } from "react-native";
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";
import AddMedicalExamButton from "./AddMedicalExamButton";
import MedicalExamsList from "./MedicalExamsList";

const Exams = [
  {
    id: 1,
    date: "2000-09-08",
    dr: "Messi",
    hospital: "Oulton",
  },
  {
    id: 2,
    date: "2000-09-08",
    dr: "Messi",
    hospital: "Oulton",
  },
  {
    id: 3,
    date: "2000-09-08",
    dr: "Messi",
    hospital: "Oulton",
  },
  {
    id: 4,
    date: "2000-09-08",
    dr: "Messi",
    hospital: "Oulton",
  },
];

export default function MedicalExamsContainer({ isLoading, isError }) {
  let content;

  if (isLoading) {
    content = <MedicalExamsSkeleton />;
  }

  if (isError) {
    content = <ErrorFetchingMedicalExams />;
  }

  if (!isLoading && Exams) {
    content = <MedicalExamsList medicalExmas={Exams} />;
  }

  return (
    <View style={styles.container}>
      <AddMedicalExamButton></AddMedicalExamButton>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 35,
    paddingBottom: 200,
    marginTop: 20
  },
});
