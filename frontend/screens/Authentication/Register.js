import RegisterForm from "../../components/Authentication/RegisterForm";
import { authActions } from "../../context/auth";
import { login, register } from "../../services/userService";
import { useState } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors";
import GluttyModal from "../../components/UI/GluttyModal";
import { useDispatch } from "react-redux";

export default function Register() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, serError] = useState("");

  function closeModalHandler() {
    setIsError(false);
    serError("");
  }

  async function submitHandler(values, isCommerce) {
    try {
      setisloading(true);
      const registerResponse = await register(values, isCommerce);
      
      const loginResponse = await login(values.username, values.password);
      console.log(loginResponse);
      
      dispatch(
        authActions.login({
          user: loginResponse.user,
          accessToken: loginResponse.access_token,
          refreshToken: loginResponse.refresh_token,
          image: loginResponse.profile_picture,
          isCommerce: loginResponse.is_commerce,
        })
      );
    } catch (error) {
      serError(error.message);
      setIsError(true);
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} color={Colors.vainilla} />
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
