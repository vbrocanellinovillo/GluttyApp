import { useSelector } from "react-redux";
import ProfileForm from "../../components/Profile/ProfileForm";
import { update } from "../../services/userService";
import { authActions } from "../../context/auth";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";
import { getUser } from "../../services/userService";

export default function Profile() {
  const username = useSelector((state) => state.auth.userData.username);
  const token = useSelector((state) => state.auth.accessToken);

  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState();

  useEffect(() => {
    async function getUserData() {
      try {
        setisloading(true);
        const response = getUser(token);
        setUserData(response);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setShowModal(true);
      } finally {
        setisloading(false);
      }
    }

    getUserData();
  }, []);

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
      setMessage("Modificación de usuario exitosa");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
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
