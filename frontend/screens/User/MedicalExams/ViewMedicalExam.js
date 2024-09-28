import { Text, View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Colors } from "../../../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../../components/UI/FontsTexts/TextCommonsRegular";
import MedicalExamDateViewer from "../../../components/MedicalExams/MedicalExamDateViewer";
import Button from "../../../components/UI/Controls/Button";
import FormSectionContainer from "../../../components/UI/Forms/FormSectionContainer";
import MedicalControl from "../../../components/UI/Controls/MedicalControl";
import RadioButtonsControl from "../../../components/UI/Controls/RadioButtonsControl";
import MedicalValue from "../../../components/MedicalExams/MedicalValue";
import RangeBar from "../../../components/MedicalExams/RangeBar";

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
  const date = "2024-06-21";

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.dateBox}>
          <MedicalExamDateViewer date={date} />
        </View>

        {/* Información del examen */}
        <View style={styles.infoBox}>
          <TextCommonsMedium style={styles.examTitle}>
            Análisis de Sangre
          </TextCommonsMedium>
          <View style={styles.locationBox}>
            <MaterialCommunityIcons
              name="map-marker"
              size={24}descriptive
              color={Colors.mJordan}
            />
            <TextCommonsRegular style={styles.locationText}>
              LACE Laboratorios
            </TextCommonsRegular>
          </View>
        </View>

        
      </View>
      <View style={{ padding: 20 }}>
        <Button backgroundColor={Colors.locro}>Ver PDF</Button>
      </View>
      <View>
        <FormSectionContainer title="Variables Médicas">
        
         
          <RangeBar label="Hematocrito" minBarraGris={0} maxBarraGris={100} normalMin={50} normalMax={80} currentValue={70} descrip="hola" />
        </FormSectionContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Para alinear la caja de fecha y la info horizontalmente
    padding: 20,
    marginTop: -10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 3 },
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
});
