import ChangePasswordForm from "../../components/Profile/ChangePasswordForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../services/userService";
import LoadingGlutty from "../../components/UI/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";
import { useNavigation } from "@react-navigation/native";

export default function PrivacityAndSecurity() {
  const username = useSelector((state) => state.auth.userData.username);

  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const navigation = useNavigation();

  function closeModalHandler() {
    setShowModal(false);

    if (isError) return;

    navigation.navigate("Home");
  }

  async function submitHandler(previousPassword, newPassword) {
    try {
      setisloading(true);
      await changePassword(username, previousPassword, newPassword);
      setIsError(false);
      setMessage("Contraseña modificada correctamente");
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
      <ChangePasswordForm onSubmit={submitHandler} />
    </>
  );
}
