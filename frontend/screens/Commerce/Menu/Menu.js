import { useEffect, useState } from "react";
import MenuContainer from "../../../components/Menu/MenuContainer";
import {
  getAllMenues,
  sendPdf,
  deletePdf,
} from "../../../services/commerceService";
import { useSelector } from "react-redux";
import LoadingGlutty from "../../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../../components/UI/GluttyModal";
import MenuesSkeleton from "../../../components/UI/Loading/MenuesSkeleton";
import GluttyErrorScreen from "../../../components/UI/GluttyErrorScreen";

export default function Menu() {
  const [menues, setMenues] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);

  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    async function fetchMenues() {
      setIsFetching(true);
      try {
        const data = await getAllMenues(token);
        setMenues(data.menues);
        setIsError(false);
      } catch (error) {
        setErrorFetching(true);
      } finally {
        setIsFetching(false);
      }
    }

    fetchMenues();
  }, []);

  const closeModalHandler = () => {
    setIsError(false);
  };

  const enviarPdf = async (selectedDocuments) => {
    setIsUpdating(true);
    try {
      await sendPdf(selectedDocuments, token);
      // Después de enviar los documentos, vacía el array de documentos seleccionados
      setMenues([]);

      const response = await getAllMenues(token);
      setMenues(response.menues);
      setIsError(false);
    } catch (error) {
      setMessage(
        "Ocurrio un error al guardar los pdf. Por favor intente de nuevo más tarde"
      );
      setIsError(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteMenu = async (id) => {
    setIsUpdating(true);
    try {
      await deletePdf(token, id);
    } catch (error) {
      setMessage(
        "Ocurrio un error al eliminar el pdf. Por favor intente de nuevo más tarde"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  if (errorFetching) {
    return (
      <GluttyErrorScreen>
        Ocurrio un error al cargar los menues. Por favor intente de nuevo más
        tarde
      </GluttyErrorScreen>
    );
  }

  if (isFetching) {
    return <MenuesSkeleton />;
  }

  return (
    <>
      <LoadingGlutty visible={isUpdating} />
      <GluttyModal
        visible={isError}
        isError={true}
        message={message}
        onClose={closeModalHandler}
      />
      <MenuContainer menues={menues} onSave={enviarPdf} onDelete={deleteMenu} />
    </>
  );
}
