import { useDispatch } from "react-redux";
import LoginForm from "../../components/Authentication/LoginForm";
import { authActions } from "../../context/auth";
import { login } from "../../services/userService";
import { Alert } from "react-native";
import { useState } from "react";
import { sleep } from "../../utils/utilFunctions";
import LoadingGlutty from "../../components/UI/LoadingGlutty";
import { Colors } from "../../constants/colors";

export default function Login() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);

  async function submitHandler(usuario, contraseña) {
    try {
      setisloading(true);
      await sleep(8000) // acordarse de sacar esto
      const response = await login(usuario, contraseña);
      dispatch(authActions.login(response.user));
    } catch (error) {
      console.log(error);
      Alert.alert("ERROR", "No se pudo iniciar sesión");
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} color={Colors.vainilla} size="large" />
      <LoginForm onSubmit={submitHandler} />
    </>
  );
}
