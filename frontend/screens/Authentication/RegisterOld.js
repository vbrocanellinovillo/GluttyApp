import { useDispatch } from "react-redux";
import RegisterForm from "../../components/Authentication/RegisterFormOld";
import { register } from "../../services/userService";
import { useState } from "react";
import { authActions } from "../../context/auth";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";

export default function Register() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, serError] = useState("");

  function closeModalHandler() {
    setIsError(false);
    serError("");
  }

  async function submitHandler(
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email,
    contraseña
  ) {
    try {
      setisloading(true);
      const response = await register(
        nombreUsuario,
        nombre,
        apellido,
        sexo,
        fechaNacimiento,
        email,
        contraseña
      );
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
      <LoadingGlutty visible={isloading} />
      <GluttyModal
        visible={isError}
        isError={true}
        message={error}
        onClose={closeModalHandler}
      />
      <RegisterForm onSubmit={submitHandler} />
    </>
  );
}
