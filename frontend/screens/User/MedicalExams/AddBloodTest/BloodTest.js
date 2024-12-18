import { useState } from "react";
import BloodTestForm from "../../../../components/MedicalExams/BloodTestForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { registerMedicalExam } from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

export default function BloodTest({ navigation, route }) {
  const values = route.params?.values;
  const pdf = route.params?.pdf;
  const labs = route.params?.labs;

  const token = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const [createdMedicalExamId, setCreatedMedicalExamId] = useState(undefined);

  function goBack() {
    navigation.goBack();
  }

  function closeModalHandler() {
    setShowModal(false);

    if (!isError && createdMedicalExamId) {
      navigation.navigate("ViewMedicalExam", { id: createdMedicalExamId });
      setCreatedMedicalExamId(undefined);
    }
  }

  async function handleSubmit({
    igA,
    igG,
    ema,
    hemoglobina,
    hematocrito,
    ferritina,
    ferremia,
    vitB12,
    calcemia,
    vitD,
    alt,
    ast,
    colesterolemia,
    colLDL,
    colHDL,
    trigliceridos,
    glucemia,
    laboratory,
    date,
    pdf,
  }) {
    if (!laboratory || laboratory.trim() === "") {
      setIsError(true);
      setMessage("Por favor, ingrese el nombre del laboratorio.");
      setShowModal(true);
      return; // Detiene el flujo si no hay laboratorio
    }
  
    setIsLoading(true);
    try {
      const response = await registerMedicalExam(
        token,
        date,
        laboratory,
        igA,
        igG,
        ema,
        hemoglobina,
        hematocrito,
        ferritina,
        ferremia,
        vitB12,
        calcemia,
        vitD,
        alt,
        ast,
        colesterolemia,
        colLDL,
        colHDL,
        trigliceridos,
        glucemia,
        pdf
      );
      setCreatedMedicalExamId(response.analysis_id);
      setIsError(false);
      setMessage("Estudio médico registrado correctamente!");
      setShowModal(true);
    } catch (error) {
      console.log(error);
  
      setIsError(true);
      setMessage("Ocurrió un error. Por favor intente de nuevo más tarde");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <>
      <LoadingGlutty visible={isLoading} />
      <GluttyModal
        visible={showModal}
        isError={isError}
        message={message}
        onClose={closeModalHandler}
      />
      <BloodTestForm
        medicalExam={values}
        onPrev={goBack}
        onSubmit={handleSubmit}
        pdf={pdf}
        labs={labs}
      />
    </>
  );
}
