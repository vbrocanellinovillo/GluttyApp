import RegisterForm from "../../components/Authentication/RegisterForm";
import { register } from "../../services/userService";
import { useState } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors";
import GluttyModal from "../../components/UI/GluttyModal";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

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

      const username = values.username;
      const email = values.email;
      const password = values.password;

      navigation.navigate("EmailVerification", { username, email, password });
    } catch (error) {
      serError(error.message);
      setIsError(true);
      console.log(error);
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
      <RegisterForm onSubmit={submitHandler} />
    </ImageBackground>
  );
}
