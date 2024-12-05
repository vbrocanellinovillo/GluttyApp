import PasswordForm from "../../components/Authentication/PasswordForm";
import { forgotPassword, register } from "../../services/userService";
import { useState } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors";
import GluttyModal from "../../components/UI/GluttyModal";
import { ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ChangePassword() {
  const navigation = useNavigation();

  const [isloading, setisloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, serError] = useState("");
  const [modal, setModal] = useState(false);

  function closeModalHandler() {
    setIsError(false);
    serError("");
  }

  function closeConfirmModal() {
    setModal(false);
    //navigation.navigate("PasswordCodeVerification"); 
  }

  async function submitHandler(values) {
    try {
      setisloading(true);
      //para cuando este lo del back
      const forgotPasswordResponse = await forgotPassword(values.username);
      const username = values.username; 
      
      navigation.navigate("PasswordCodeVerification", { username }); 
      
      setModal(true);

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
      <GluttyModal
        visible={modal}
        isError={false}
        message={"Mail enviado!"}
        onClose={closeConfirmModal}>
        
      </GluttyModal>
      <PasswordForm onSubmit={submitHandler} />
    </ImageBackground>
  );
}
