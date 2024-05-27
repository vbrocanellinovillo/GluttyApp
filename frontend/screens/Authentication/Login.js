import { useDispatch } from "react-redux";
import LoginForm from "../../components/Authentication/LoginForm";
import { authActions } from "../../context/auth";

export default function Login() {
  const dispatch = useDispatch();

  function submitHandler(usuario, contraseña) {
    dispatch(authActions.login());
  }

  return <LoginForm onSubmit={submitHandler} />;
}
