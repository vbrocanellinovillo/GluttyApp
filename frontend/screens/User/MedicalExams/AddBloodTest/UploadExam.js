import { useState } from "react";
import UploadExamForm from "../../../../components/MedicalExams/UploadExamForm";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../../components/UI/GluttyModal";
import { sendMedicalPDF } from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";

export default function UploadExam({ navigation }) {
  const token = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  function cancel() {
    navigation.goBack();
  }

  function skip() {
    navigation.navigate("BloodTest");
  }

  function closeModalHandler() {
    setIsError(false);
    navigation.navigate("BloodTest");
  }

  async function readPdf(pdf) {
    setIsLoading(true);
    try {
      const data = await sendMedicalPDF(pdf, token);
      const values = data.valores_encontrados;
      navigation.navigate("BloodTest", { values, pdf });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isLoading}>Escaneando el pdf..</LoadingGlutty>
      <GluttyModal
        visible={isError}
        isError={true}
        message="Ocurrio un error al leer el pdf. Se continuará con la carga manual"
        onClose={closeModalHandler}
      />
      <UploadExamForm onCancel={cancel} onOmit={skip} onReadPdf={readPdf} />
    </>
  );
}
