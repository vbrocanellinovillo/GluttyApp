import { useEffect, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ImageBackground } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors"; 
import { changeForgottenPassword } from "../../services/userService";

import SetNewPasswordForm from "../../components/Authentication/SetNewPasswordForm";
import GluttyModal from "../../components/UI/GluttyModal";



export default function SetNewPassword({route}) {

  const { username } = route.params; 
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
  }

  async function submitHandler(values) {
    console.log("user " +username)
    console.log("con " +values.newPassword)
    
    try {
      setisloading(true);
      const changePasswordResponse = await changeForgottenPassword(username, values.newPassword);
      
      
      navigation.navigate("Login"); 
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
      <SetNewPasswordForm onSubmit={submitHandler} />
    </ImageBackground>
  );
};
