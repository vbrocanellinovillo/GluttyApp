import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../../../components/UI/FontsTexts/TextCommonsMedium";
import TextCommonsRegular from "../../../components/UI/FontsTexts/TextCommonsRegular";
import MedicalExamDateViewer from "../../../components/MedicalExams/MedicalExamDateViewer";
import Button from "../../../components/UI/Controls/Button";
import FormSectionContainer from "../../../components/UI/Forms/FormSectionContainer";
import RangeBar from "../../../components/MedicalExams/RangeBar";
import ValorPosNeg from "../../../components/MedicalExams/ValorPosNeg";
import {
  deleteMedicalExam,
  getMedicalExamById,
} from "../../../services/medicalExamService";
import ContextualMenu from "../../../components/UI/contextualMenu";
import GluttyModal from "../../../components/UI/GluttyModal";
import ViewMedicalExamSkeleton from "../../../components/UI/Loading/ViewMedicalExamSkeleton";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import { usePdf } from "../../../hooks/usePdf";

export default function ViewMedicalExam({ navigation, route }) {
  const [medicalExam, setMedicalExam] = useState(undefined);
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showMenu, setShowMenu] = useState(false); // Estado para mostrar el menú contextual
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [showEliminarModal, setShowEliminarModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const id = route.params.id;
  const token = useSelector((state) => state.auth.accessToken);

  const { handlePdf } = usePdf();

  useEffect(() => {
    const cargarEstudioMedico = async () => {
      try {
        setIsLoading(true);
        const medicExam = await getMedicalExamById(id, token);
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
  }, [id, token]);

  // Función para manejar la eliminación
  async function handleDelete() {
    setShowEliminarModal(true); // Mostrar modal de confirmación antes de eliminar
  }

  const handleEdit = () => {
    // Lógica para editar el estudio
    navigation.navigate("EditBloodTestStack", {
      screen: "EditBloodTest",
      params: { medicalExam, id },
    });
  };

  function closeModalHandler() {
    setShowModal(false);
    // Navegación una vez que el modal se cierre
    navigation.navigate("MedicalStatistics", { shouldRefresh: true });
  }

  function closeModalDeleteHandler() {
    setShowEliminarModal(false);
  }

  // Confirmación de la eliminación
  async function handleConfirmDelete() {
    try {
      setIsDeleting(true);
      const response = await deleteMedicalExam(id, token);
      setMessage("Se eliminó el análisis."); // Mensaje de confirmación de eliminación
      setShowEliminarModal(false); // Cerrar modal de confirmación de eliminación
      setShowModal(true); // Mostrar modal de que se eliminó el análisis
    } catch (error) {
      setIsError(true);
      setMessage(error.message); // Si hay error, mostrar el mensaje de error
      setShowModal(true);
    } finally {
      setIsDeleting(false); // Detener la animación de carga
    }
  }

  function navigatePdf() {
    handlePdf(medicalExam?.pdf_info?.file_name, medicalExam?.pdf_info?.url);
  }

  const hasPdf = medicalExam?.pdf_info !== undefined;

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <GluttyModal
        visible={showEliminarModal}
        onClose={closeModalDeleteHandler}
        message="¿Seguro que desea eliminar el estudio?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: handleConfirmDelete,
          },
        ]}
        closeButtonText="Cancelar"
      />
      <LoadingGlutty visible={isDeleting} />

      {isloading && <ViewMedicalExamSkeleton />}

      {medicalExam && !isloading && (
        <>
          {/* ENCABEZADO */}
          <View style={styles.container}>
            <View style={styles.options}>
              <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={Colors.darkGray}
                />
              </TouchableOpacity>

              {showMenu && (
                <ContextualMenu onEdit={handleEdit} onDelete={handleDelete} isStudy={true} />
              )}
            </View>

            <View style={styles.infoEncabezado}>
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
                    size={24}
                    color={Colors.mJordan}
                  />
                  <TextCommonsRegular style={styles.locationText}>
                    {medicalExam.lab}
                  </TextCommonsRegular>
                </View>
              </View>
            </View>
          </View>

          {hasPdf && (
            <Button style={styles.pdf} onPress={navigatePdf}>
              Ver PDF
            </Button>
          )}

          {/* VARIABLES */}
          <TextCommonsMedium style={styles.titleVarMed}>
            Variables Médicas
          </TextCommonsMedium>
          <ScrollView style={styles.scrollview}>
            {medicalExam.variables.map((item) => (
              <View key={item.variable_name}>
                {item.value === "Positivo" ||
                item.value === "Negativo" ||
                item.value === "NEGATIVO" ||
                item.value === "POSITIVO" ? (
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
                      unit={item.unit_of_measurement}
                    />
                  </FormSectionContainer>
                )}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
  infoEncabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: -7,
  },
  options: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: 7,
    zIndex: 1500, // Asegura que el menú esté por delante
  },
  dateBox: {
    backgroundColor: Colors.humita,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 13,
    flex: 1,
  },
  infoBox: {
    marginLeft: 20,
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
    color: Colors.darkGray,
  },
  scrollview: {
    paddingBottom: 200,
    marginBottom: 110,
  },
  titleVarMed: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.locro,
    marginLeft: 20,
    marginTop: 30,
  },

  pdf: {
    backgroundColor: Colors.locro,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 14,
  },
});
