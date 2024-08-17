import { useDispatch, useSelector } from "react-redux";
import ProfileForm from "../../components/Profile/ProfileForm";
import { update } from "../../services/userService";
import { authActions } from "../../context/auth";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";
import NoUserData from "../../components/Profile/NoUserData";
import { getUser } from "../../services/userService";
import { View, Text } from "react-native";

export default function CommerceProfile() {
  const token = useSelector((state) => state.auth.accessToken);

  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState();


  useEffect(() => {
    async function getCommerceData() {
      try {
        setisloading(true);
        const response = getUser(token)
        setUserData(response)
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setShowModal(true);
      } finally {
        setisloading(false);
      }
    }

    getCommerceData();
  }, []);

  function closeModalHandler() {
    setShowModal(false);
  }

  async function submitHandler(
    nombreComercio,
    cuit,
    email
  ) {
    try {
      setisloading(true);
      const response = await update(
        nombreComercio,
        cuit,
        email,
        userData.id
      );
      dispatch(authActions.updateUser(response.user));
      setIsError(false);
      setMessage("Modificación de usuario exitosa");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setisloading(false);
    }
  }
  console.log(userData)
  console.log("El de arriba es el userdata");
  //console.log(token)
  return (
    <View>
        <Text>Hola</Text>
    </View>
  );
  
}
