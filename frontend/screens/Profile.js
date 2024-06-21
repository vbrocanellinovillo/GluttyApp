import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/Profile/ProfileForm";
import { update } from "../services/userService";
import { Alert } from "react-native";
import { authActions } from "../context/auth";
import { useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Colors } from "../constants/colors";
import LoadingGlutty from "../components/UI/LoadingGlutty";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);

  async function submitHandler(
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email
  ) {
    try {
      setisloading(true);
      const response = await update(
        nombreUsuario,
        nombre,
        apellido,
        sexo,
        fechaNacimiento,
        email,
        userData.id
      );
      dispatch(authActions.updateUser(response.user));
      Alert.alert("Usuario modificado", "Se modifico el usuario correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo modificar");
    } finally {
      setisloading(false);
    }
  }

  return (
    <>
      <LoadingGlutty visible={isloading} />
      <ProfileForm onSubmit={submitHandler} user={userData} />
    </>
  );
}
