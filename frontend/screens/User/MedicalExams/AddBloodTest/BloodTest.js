import { useState } from "react";
import BloodTestForm from "../../../../components/MedicalExams/BloodTestForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { registerMedicalExam } from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";

export default function BloodTest({ navigation, route }) {
  const values = route.params?.values;
  const pdf = route.params?.pdf;

  const token = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  function goBack() {
    navigation.goBack();
  }

  function closeModalHandler() {
    setShowModal(false);

    if (!isError) {
      navigation.navigate("MedicalExams");
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
    pdf
  }) {
    setIsLoading(true);
    try {
      await registerMedicalExam(
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
      );
      setIsError(false);
      setMessage("Estudio medico registrado correctamente!");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage("Ocurrio un error. Por favor intente de nuevo más tarde");
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
      />
    </>
  );
}
