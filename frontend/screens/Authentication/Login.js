import { useDispatch } from "react-redux";
import LoginForm from "../../components/Authentication/LoginForm";
import { authActions } from "../../context/auth";
import { login } from "../../services/userService";
import { useState } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors";
import GluttyModal from "../../components/UI/GluttyModal";

export default function Login() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, serError] = useState("");

  function closeModalHandler() {
    setIsError(false);
    serError("");
  }

  async function submitHandler(usuario, contraseña) {
    try {
      setisloading(true);
      const response = await login(usuario, contraseña);
      dispatch(authActions.login(response.user));
    } catch (error) {
      serError(error.message);
      setIsError(true);
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} color={Colors.vainilla} size="large" />
      <GluttyModal
        visible={isError}
        isError={true}
        message={error}
        onClose={closeModalHandler}
      />
      <LoginForm onSubmit={submitHandler} />
    </>
  );
}
