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
import { Colors } from "../../../constants/colors";
import { usePdf } from "../../../hooks/usePdf";

export default function Menu() {
  const [menues, setMenues] = useState([]);

  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const [message, setMessage] = useState("");

  const token = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    fetchMenues();
  }, []);

  async function fetchMenues() {
    setIsFetching(true);
    try {
      const data = await getAllMenues(token);
      setMenues(data.menues);
      setErrorFetching(false);
    } catch (error) {
      setErrorFetching(true);
    } finally {
      setIsFetching(false);
    }
  }

  const closeModalHandler = () => {
    setIsError(false);
    setMessage("");
  };

  const enviarPdf = async (selectedDocuments) => {
    setIsUpdating(true);
    try {
      await sendPdf(selectedDocuments, token);
      fetchMenues();
    } catch (error) {
      setMessage(
        "Ocurrio un error al guardar los pdf. Por favor intente de nuevo más tarde"
      );
      setIsError(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    await deleteMenu(deleteId);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const confirmDelete = async (id) => {
    setDeleteId(id);
    setShowConfirmModal(true);
  };

  const deleteMenu = async (id) => {
    setIsUpdating(true);
    try {
      await deletePdf(token, id);
      fetchMenues();
    } catch (error) {
      setMessage(
        "Ocurrio un error al eliminar el pdf. Por favor intente de nuevo más tarde"
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const { handlePdf } = usePdf();

  if (errorFetching) {
    return (
      <GluttyErrorScreen width={300} height={300}>
        Ocurrio un error al cargar los menús. Por favor intente de nuevo más
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
      <GluttyModal
        visible={showConfirmModal}
        message="¿Seguro que desea borrar este pdf?"
        other
        onClose={handleCancel}
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: handleConfirm,
            id: 1,
          },
        ]}
      />
      <MenuContainer
        menues={menues}
        onSave={enviarPdf}
        onDelete={confirmDelete}
        onVisualize={handlePdf}
      />
    </>
  );
}
