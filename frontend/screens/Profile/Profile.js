import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../../components/Profile/ProfileForm";
import { update } from "../../services/userService";
import { Alert } from "react-native";
import { authActions } from "../../context/auth";
import { useState } from "react";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { Colors } from "../../constants/colors";
import LoadingGlutty from "../../components/UI/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  function closeModalHandler() {
    setShowModal(false);
  }

  async function submitHandler(
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email
  ) {
    try {
      setisloading(true);
      const response = await update(
        nombreUsuario,
        nombre,
        apellido,
        sexo,
        fechaNacimiento,
        email,
        userData.id
      );
      dispatch(authActions.updateUser(response.user));
      setIsError(false);
      setMessage("Usuario modificado correctamente");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage("No se pudo modificar el usuario");
      setShowModal(true);
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <ProfileForm onSubmit={submitHandler} user={userData} />
    </>
  );
}
