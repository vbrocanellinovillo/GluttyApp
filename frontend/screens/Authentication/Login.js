import { useDispatch } from "react-redux";
import LoginForm from "../../components/Authentication/LoginForm";
import { authActions } from "../../context/auth";
import { login } from "../../services/userService";
import { useState } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors";
import GluttyModal from "../../components/UI/GluttyModal";
import { ImageBackground } from "react-native";

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
      dispatch(
        authActions.login({
          user: response.user,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          image: response.profile_picture,
          isCommerce: response.is_commerce,
          isAdmin: response.is_superuser, 
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
    <ImageBackground
      source={{
        uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1724723859/background_djisqg.webp",
      }}
      style={{ flex: 1 }}
    >
      <LoadingGlutty visible={isloading} color={Colors.vainilla} />
      <GluttyModal
        visible={isError}
        isError={true}
        message={error}
        onClose={closeModalHandler}
      />
      <LoginForm onSubmit={submitHandler} />
    </ImageBackground>
  );
}
