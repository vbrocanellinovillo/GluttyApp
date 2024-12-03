import { useState } from "react";
import PhotosForm from "../../../../components/Branch/AddBranchForms/PhotosForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";
import { addBranch } from "../../../../services/commerceService";
import { useDispatch, useSelector } from "react-redux";
import { commerceActions } from "../../../../context/commerce";

export default function Photos({ navigation, route }) {
  const receivedBranch = route.params.branch;

  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  function goBack() {
    navigation.navigate("MapConfirmation", { branch: receivedBranch });
  }

  function finish(images) {
    receivedBranch.photos = images;
    confirmSave();
  }

  function closeModalHandler() {
    setShowModal(false);

    if (!isError) {
      navigation.navigate("CommerceDrawer");
    }
  }

  function confirmSave() {
    setConfirmModalVisible(true);
  }

  function handleConfirm() {
    setConfirmModalVisible(false);
    save();
  }

  function closeConfirm() {
    setConfirmModalVisible(false);
  }

  async function save() {
    console.log(receivedBranch)
    setIsLoading(true);

    try {
      const response = await addBranch(receivedBranch, token);
      dispatch(commerceActions.addBranch({ branch: response }));
      setIsError(false);
      setMessage("Sucursal cargada exitosamente");
      setShowModal(true);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isLoading} />
      <GluttyModal
        visible={confirmModalVisible}
        message="¿Deseas confirmar la nueva sucursal?"
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: handleConfirm,
          },
        ]}
        onClose={closeConfirm}
        closeButtonBg={Colors.redError}
        closeButtonColor={Colors.whiteRed}
        other
      />
      <GluttyModal
        visible={showModal}
        message={message}
        isError={isError}
        onClose={closeModalHandler}
      />
      <PhotosForm onBack={goBack} onNext={finish} />
    </>
  );
}
