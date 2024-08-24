
import { useDispatch, useSelector } from "react-redux";
import CommerceProfileForm from "../../components/Profile/CommerceProfileForm";
import { update } from "../../services/commerceService";
import {getUser} from "../../services/userService"
import { authActions } from "../../context/auth";
import { useState, useEffect } from "react";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import GluttyModal from "../../components/UI/GluttyModal";
import NoUserData from "../../components/Profile/NoUserData";

export default function CommerceProfile() {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);
  const [isloading, setisloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function getCommerceData() {
      try {
        setisloading(true);
        const response = await getUser(token);
        setUserData(response); 
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setShowModal(true);
        console.log("ERROR", error);
      } finally {
        setisloading(false);
      }
    }

    getCommerceData();
  }, [token]);

  function closeModalHandler() {
    setShowModal(false);
  }

  async function submitHandler(cuit, name, email, username, description) {
    try {
      setisloading(true);
      console.log("UID" + user.id)
      const response = await update(cuit, name, email, username, description, user.id);
      dispatch(authActions.updateUser(response.user));
      setIsError(false);
      setMessage("Modificación de comercio exitosa");
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setisloading(false);
    }
  }

  if (isloading) {
    return <LoadingGlutty visible={isloading} />;
  }

  if (!userData) {
    return <NoUserData />;
  }

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <CommerceProfileForm onSubmit={submitHandler} user={userData.user_data} commerce={userData.commerce_data}/>
    </>
  );
}
