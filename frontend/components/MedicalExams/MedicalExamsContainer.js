import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react"; // Importar useState y useEffect
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";
import AddMedicalExamButton from "./AddMedicalExamButton";
import MedicalExamsList from "./MedicalExamsList";
import { getMedicalExamsList } from "../../services/medicalExamService";
import { useSelector } from "react-redux";
import MedicalExamsSkeleton from "../UI/Loading/MedicalExamsSkeleton";

export function MedicalExamsContainer({ isLoading, isError }) {
  const [exams, setExams] = useState(undefined);
  const [loading, setLoading] = useState(false); // Estado de loading local
  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    async function fetchMedicalExams() {
      try {
        setLoading(true); // Empezar la carga
        const response = await getMedicalExamsList(token);
        setExams(response); // Guardar los exámenes en el estado
        console.log(exams); //a:",exams);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Terminar la carga
      }
    }
    if (isLoading) {
      fetchMedicalExams();
    }
  }, [isLoading, token]); // Ejecutar cuando isLoading o token cambie

  let content;

  if (loading) {
    content = <MedicalExamsSkeleton />;
  }

  if (isError) {
    content = <ErrorFetchingMedicalExams />;
  }

  if (!loading && exams) {
    content = <MedicalExamsList medicalExams={exams.analysis} />;
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
    paddingHorizontal: 20,
    gap: 35,
    paddingBottom: 200,
    marginTop: 20,
  },
});
