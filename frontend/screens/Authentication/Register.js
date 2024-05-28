import { useDispatch } from "react-redux";
import RegisterForm from "../../components/Authentication/RegisterForm";
import { register } from "../../services/userService";
import { Alert } from "react-native";
import { useState } from "react";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { Colors } from "../../constants/colors";
import { authActions } from "../../context/auth";

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
      const res = await register(
        nombreUsuario,
        nombre,
        apellido,
        sexo,
        fechaNacimiento,
        email,
        contraseña
      );
      console.log("se registro");
      dispatch(authActions.login());
    } catch (error) {
      Alert.alert("Error", "No se pudo registrar");
    } finally {
      setisloading(false);
    }
  }

  if (isloading) {
    return <LoadingIndicator color={Colors.mJordan} size="large" />;
  }

  return <RegisterForm onSubmit={submitHandler} />;
}
