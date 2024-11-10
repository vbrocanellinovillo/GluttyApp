import { StyleSheet, View, Image } from "react-native";
import { useState, useEffect } from "react"; // Importar useState y useEffect
import ErrorFetchingMedicalExams from "./ErrorFetchingMedicalExams";
import AddMedicalExamButton from "./AddMedicalExamButton";
import MedicalExamsList from "./MedicalExamsList";
import { getMedicalExamsList } from "../../services/medicalExamService";
import { useSelector } from "react-redux";
import MedicalExamsSkeleton from "../UI/Loading/MedicalExamsSkeleton";
import { Text } from "react-native";
import GluttyErrorScreen from "../UI/GluttyErrorScreen";
import { doctorGlutty, sadGlutty } from "../../constants/glutty";

export function MedicalExamsContainer({ isLoading, isError }) {
  const [exams, setExams] = useState([]);
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

  if ((exams.analysis?.length == 0) & !loading){
    console.log(exams);
    content =
    <View style={{
      height: 500,
      width: '100%',
      justifyContent: 'flex-start',
      //justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
     // backgroundColor: '#f8f9fa' // color suave para mejorar la apariencia
    }}>
      <Image 
        source={{uri:doctorGlutty}}
        style={{ width: 100, height: 100, marginBottom: 10, marginTop: 20, objectFit:"contain" }}
      />
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center'
      }}>
        No tienes exámenes cargados por el momento
      </Text>
    </View>
  }else{
    if (!loading && exams) {
      content = <MedicalExamsList medicalExams={exams.analysis} />;
     }
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
