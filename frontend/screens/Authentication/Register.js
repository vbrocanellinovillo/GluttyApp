import RegisterForm from "../../components/Authentication/RegisterForm";
import { authActions } from "../../context/auth";
import { register } from "../../services/userService";
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
      const response = await register(values, isCommerce);
      dispatch(
        authActions.login({
          user: response.user,
          accessToken: response.access_token,
          refreshToken: response.refresh_token,
          image: response.profile_picture,
          isCommerce: response.is_commerce,
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
      <RegisterForm onSubmit={submitHandler} />;
    </>
  );
}
