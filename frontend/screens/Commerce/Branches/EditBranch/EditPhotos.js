import { useState } from "react";
import PhotosForm from "../../../../components/Branch/AddBranchForms/PhotosForm";
import GluttyModal from "../../../../components/UI/GluttyModal";
import LoadingGlutty from "../../../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../../../constants/colors";
import { addBranch } from "../../../../services/commerceService";
import { useDispatch, useSelector } from "react-redux";
import { commerceActions } from "../../../../context/commerce";
import { updateBranch } from "../../../../services/commerceService";

export default function Photos({ navigation, route }) {
  const receivedBranch = route.params.branch;

  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const branch = route.params.branch;
  const id_photos = branch.photos.map(photo => photo.id);
  const id_elim = [];

  function goBack() {
    navigation.goBack();
  }

  function finish(selectedImages) {
    console.log(selectedImages); // Aquí puedes ver las imágenes que fueron seleccionadas
    branch.photos = selectedImages;
    console.log(branch.photos)

    console.log(id_elim); // Imágenes eliminadas (si las hay)

    console.log("poner lógica del guardado de las fotos.");
    console.log(branch.photos)
    save();


  }
  

  const removeImage = (id) => {
    id_elim.push(id);
    setImages((prevImages) => prevImages.filter((image) => image.id !== id));
  };
  
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
    setIsLoading(true);

    try {
      console.log("wtf hermanita anda")
      branch.schedules = []
      console.log(branch.photos); // Fotos originales del branch (si las hay)
      const response = await updateBranch(branch, branch.id, token, id_elim);
      setIsError(false);
      setMessage("Sucursal actualizada exitosamente");
      setShowModal(true);
    } catch (error) {
      setMessage(error.message);
      setIsError(true);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

   // Nueva función para manejar la eliminación de una imagen
   function onRemoveImage(id) {
    id_elim.push(id);
    console.log("Imagen eliminada con id:", id);
  }

  return (
    <>
      <LoadingGlutty visible={isLoading} />
      <GluttyModal
        visible={confirmModalVisible}
        message="¿Deseas guardar las imagenes"
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
      <PhotosForm 
        onBack={goBack} 
        onNext={finish} 
        initialImages={branch.photos} 
        onRemoveImage={onRemoveImage} // Pasamos la función al PhotosForm
      />
    </>
  );
}
