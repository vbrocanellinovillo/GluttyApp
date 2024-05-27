import { useDispatch } from "react-redux";
import RegisterForm from "../../components/Authentication/RegisterForm";
import { register } from "../../services/userService";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";

export default function Register() {
  const dispatch = useDispatch();

  const [isloading, setisloading] = useState(false)
  
  async function submitHandler(nombreUsuario, nombre, apellido, sexo, fechaNacimiento, email, contraseña) {
    try {
      setisloading(true)
      const res = await register(nombreUsuario, nombre, apellido, sexo, fechaNacimiento, email, contraseña)
      // console.log(fechaNacimiento.toJSON())
      console.log(res)
      dispatch(authActions.login());  
    } catch (error) {

      console.log(error)
      Alert.alert("ERROR", "no se puede registrar >:/!!!!")
    }
    finally {
      setisloading(false)}

  }

  if (isloading) {
    return <ActivityIndicator color={Colors.mJordan} size="large"/>
  }

  return <RegisterForm onSubmit={submitHandler} />;
}
