import { useDispatch } from "react-redux";
import RegisterForm from "../../components/Authentication/RegisterForm";
import { register } from "../../services/userService";
import { Alert } from "react-native";
import { useState } from "react";
import { authActions } from "../../context/auth";
import LoadingGlutty from "../../components/UI/LoadingGlutty";

export default function Register() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);

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
      Alert.alert("Error", "No se pudo registrar");
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <RegisterForm onSubmit={submitHandler} />
    </>
  );
}
