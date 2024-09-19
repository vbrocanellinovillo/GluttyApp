import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Colors } from "../../../constants/colors";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../../components/UI/FontsTexts/TextCommonsRegular";
import MedicalExamDateViewer from "../../../components/MedicalExams/MedicalExamDateViewer";

export default function ViewMedicalExam({ route }) {
  const [medicalExam, setMedicalExam] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const id = route.params;
  console.log(id);

  const token = useSelector((state) => state.auth.accessToken);
  console.log(token);

//   useFocusEffect(
//     useCallback(() => {
//       const cargarEstudioMedico = async () => {
//         try {
//           setIsLoading(true);
//           const medicExam = await getMedicalExamById(id, token); 
//           setMedicalExam(medicExam);
//         } catch (error) {
//           setIsError(true);
//         } finally {
//           setIsLoading(false);
//         }
//       };
  
//       if (id && token) {
//         cargarEstudioMedico();
//       }
//     }, [id, token]) 
//   );
    const date = "2024-06-21"

  return (    
    <View style={styles.container}>
      //* Caja de fecha */
      <View style={styles.dateBox}>
        <MedicalExamDateViewer date={date} />
      </View>

      {/* Información del examen */}
      <View style={styles.infoBox}>
        <TextCommonsMedium style={styles.examTitle}>Análisis de Sangre</TextCommonsMedium>
        <View style={styles.locationBox}>
            <MaterialCommunityIcons name="map-marker" size={24} color = {Colors.mJordan} />
            <TextCommonsRegular style={styles.locationText}>LACE Laboratorios</TextCommonsRegular>
        </View>
      </View>

      // ACA ME QUEDE 
      {/*<ConsultMedicalVariable ={branch} />*/}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // Para alinear la caja de fecha y la info horizontalmente
        padding: 20,
        marginTop: -10,
        margin: 20,
        alignItems: "center",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "grey",
    },
      dateBox: {
        backgroundColor: Colors.humita, 
        padding: 10,
        paddingBottom: 10,
        borderRadius: 13,
        flex: 1,
        
      },
      infoBox: {
        marginLeft: 20, // Espacio entre la fecha y la info
        flex: 3, 
      },
      examTitle: {
        fontSize: 22,
        fontWeight: "bold",
      },
      locationBox: {
        flexDirection: "row",
        marginTop: 7,
        alignItems: "center",

      },
      locationText: {
        fontSize: 15,
        color: Colors.darkGray, // Elige un color de texto adecuado
      },
})