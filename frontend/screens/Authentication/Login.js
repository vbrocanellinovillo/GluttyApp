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
      const res = await login(usuario, contraseña);
      console.log(res);
      dispatch(authActions.login());
    } catch (error) {
      console.log(error);
      Alert.alert("ERROR", "no podes entrar >:/ !!!!");
    } finally {
      setisloading(false);
    }
  }

  if (isloading)
    return <LoadingIndicator color={Colors.mJordan} size="large" />;

  return <LoginForm onSubmit={submitHandler} />;
}
