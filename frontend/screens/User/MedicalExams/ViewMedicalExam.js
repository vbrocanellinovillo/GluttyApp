import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { Colors } from "../../../constants/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../../components/UI/FontsTexts/TextCommonsRegular";
import MedicalExamDateViewer from "../../../components/MedicalExams/MedicalExamDateViewer";
import Button from "../../../components/UI/Controls/Button";
import FormSectionContainer from "../../../components/UI/Forms/FormSectionContainer";
import RangeBar from "../../../components/MedicalExams/RangeBar";
import ValorPosNeg from "../../../components/MedicalExams/ValorPosNeg";
import { getMedicalExamById } from "../../../services/medicalExamService";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import AddButton from "../../../components/UI/Controls/AddButton";


export default function ViewMedicalExam({ route }) {
  const [medicalExam, setMedicalExam] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const id = route.params.id;
  console.log(id);

  const token = useSelector((state) => state.auth.accessToken);
  console.log(token);
  
  useFocusEffect(
     useCallback(() => {
        const cargarEstudioMedico = async () => {
     try {
          setIsLoading(true);
          const medicExam = await getMedicalExamById(id, token);
          console.log("Medico", medicExam)
          setMedicalExam(medicExam);
       } catch (error) {
          setIsError(true);
       } finally {
         setIsLoading(false);
       }
     };

    if (id && token) {
       cargarEstudioMedico();
    }
  }, [id, token])
  );

 return ( 
  <>
    {/* Muestra el loading mientras se cargan los datos */}
    <LoadingGlutty visible={isloading} color={Colors.vainilla} />

    {/* Verifica si ya hay datos cargados antes de renderizar el contenido */}
    { medicalExam && (
      <>
        {/* ENCABEZADO */}
        <View style={styles.container}>
          <View style={styles.dateBox}>
            <MedicalExamDateViewer date={medicalExam.date} />
          </View>

          <View style={styles.infoBox}>
            <TextCommonsMedium style={styles.examTitle}>
              Análisis de Sangre
            </TextCommonsMedium>

            <View style={styles.locationBox}>
              <MaterialCommunityIcons
                name="map-marker"
                size={24} descriptive
                color={Colors.mJordan}
              />
              
            <TextCommonsRegular style={styles.locationText}>
              {medicalExam.lab}
            </TextCommonsRegular>
              
            </View>
          </View>
        </View>

        {/* PDF */}
        <View style={{ padding: 20, flexDirection:"row", justifyContent: "space-between", marginHorizontal: 10}}>
          <Button style={styles.opciones} backgroundColor={Colors.locro}>Ver PDF</Button>
          <Button style={styles.opciones} backgroundColor={Colors.locro}>Eliminar</Button>
          <Button style={styles.opciones} backgroundColor={Colors.locro}>Editar</Button>
        </View>

        {/* VARIABLES*/}

        <TextCommonsMedium style={styles.titleVarMed}>Variables Médicas</TextCommonsMedium>
        <ScrollView style={styles.scrollview}>
        
        {medicalExam.variables.map((item) => (
        <View key={item.variable_name}>
        {(item.value === "Positivo" || item.value === "Negativo") ? (
          <FormSectionContainer>
            <ValorPosNeg 
              label={item.variable_name} 
              valor={item.value} 
              descrip={item.description} 
            />
          </FormSectionContainer>
        ) : (
          <FormSectionContainer>
            <RangeBar 
              label={item.variable_name} 
              minBarraGris={item.min_value} 
              maxBarraGris={item.max_value}  
              normalMin={item.min_value} 
              normalMax={item.max_value} 
              currentValue={item.value} 
              descrip={item.description} 
              lab={medicalExam.lab} 
            />
          </FormSectionContainer>
        )}
      </View>))}
       </ScrollView>
      </>
    )}
  </>
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
  scrollview: {
    //marginBottom: 20,
    paddingBottom: 200,
    marginBottom: 110,
  },
  titleVarMed:{
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.locro,
    marginLeft: 20,
   },
   opciones:{
   },
});

