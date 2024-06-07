import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../components/Profile/ProfileForm";
import { update } from "../services/userService";
import { Alert } from "react-native";
import { authActions } from "../context/auth";
import { useState } from "react";
import LoadingIndicator from "../components/UI/LoadingIndicator";
import { Colors } from "../constants/colors";

export default function Profile() {
  const userData = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false);


  async function submitHandler(
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email,
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
      dispatch(authActions.updateUser(response.user))
      Alert.alert("delfi decidi porfa", "Se modifico el usuario correctamente")
    } catch (error) {
      Alert.alert("Error", "No se pudo modificar");
    } finally {
      setisloading(false);
    }
  }

  if (isloading)
    return <LoadingIndicator color={Colors.mJordan} size="large" />;

  return (
    <ProfileForm onSubmit={submitHandler} user={userData}/>
  );
}
