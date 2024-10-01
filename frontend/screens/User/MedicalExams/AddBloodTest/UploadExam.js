import { useEffect, useState } from "react";
import UploadExamForm from "../../../../components/MedicalExams/UploadExamForm";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../../components/UI/GluttyModal";
import {
  getLabs,
  sendMedicalPDF,
} from "../../../../services/medicalExamService";
import { useSelector } from "react-redux";
import BloodTestSkeleton from "../../../../components/UI/Loading/BloodTestSkeleton";
import GluttyErrorScreen from "../../../../components/UI/GluttyErrorScreen";

export default function UploadExam({ navigation }) {
  const token = useSelector((state) => state.auth.accessToken);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [labs, setLabs] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetchLabs();
  }, []);

  async function fetchLabs() {
    setIsFetching(true);
    try {
      const data = await getLabs(token);
      setLabs(data);
      setFetchError(false);
    } catch (error) {
      setFetchError(true);
    } finally {
      setIsFetching(false);
    }
  }

  function cancel() {
    navigation.goBack();
  }

  function skip() {
    navigation.navigate("BloodTest", { labs });
  }

  function closeModalHandler() {
    setIsError(false);
    navigation.navigate("BloodTest");
  }

  async function readPdf(pdf) {
    setIsLoading(true);
    try {
      const data = await sendMedicalPDF(pdf, token);
      const values = data["valores encontrados"];

      navigation.navigate("BloodTest", { values, pdf, labs });
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (isFetching) return <BloodTestSkeleton />;

  if (!isFetching && fetchError) {
    // Agregarle boton para volver a eso
    return (
      <GluttyErrorScreen height={200} width={200}>
        Ocurrio un error. Por favor intente cargar su estudio más tarde
      </GluttyErrorScreen>
    );
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
