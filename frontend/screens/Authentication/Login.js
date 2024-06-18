import { useDispatch } from "react-redux";
import LoginForm from "../../components/Authentication/LoginForm";
import { authActions } from "../../context/auth";
import { login } from "../../services/userService";
import { ActivityIndicator, Alert } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

export default function Login() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);

  async function submitHandler(usuario, contraseña) {
    try {
      setisloading(true);
      const response = await login(usuario, contraseña);
      dispatch(authActions.login(response.user));
    } catch (error) {
      console.log(error);
      Alert.alert("ERROR", "No se pudo iniciar sesión");
    } finally {
      setisloading(false);
    }
  }

  if (isloading)
    return <LoadingIndicator color={Colors.mJordan} size="large" />;

  return <LoginForm onSubmit={submitHandler} />;
}
