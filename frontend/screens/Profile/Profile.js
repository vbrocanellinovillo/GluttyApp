import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../context/auth";
import { useState, useEffect } from "react";
import { getUser, update } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import GluttyModal from "../../components/UI/GluttyModal";
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import UpdateProfile from "../../components/Profile/UpdateProfile";

export default function Profile() {
  const token = useSelector((state) => state.auth.accessToken);
  const refreshtoken = useSelector((state) => state.auth.refreshToken);
  const isCommerce = useSelector((state) => state.auth.isCommerce);

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.userData);
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateMessage = isCommerce
    ? "Datos de comercio actualizados correctamente"
    : "Datos de cuenta actualizados correctamente";

  const navigation = useNavigation();

  useEffect(() => {
    async function getUserData() {
      try {
        setIsFetching(true);
        const response = await getUser(token);
        setUserData(response);
        setIsError(false);
      } catch (error) {
        setIsError(true);
        setMessage(error.message);
        setShowModal(true);
      } finally {
        setIsFetching(false);
      }
    }

    getUserData();
  }, [token]);

  function closeModalHandler() {
    setShowModal(false);
    if (!isError) {
      if (isCommerce) {
        navigation.navigate("Sucursales", { screen: "Branches" });
      } else {
        navigation.navigate("Home");
      }
    }
  }

  async function submitHandler(userData) {
    setIsUpdating(true);
    try {
      const response = await update(user.id, isCommerce, userData, token);

      if (response.tokens) {
        const nuevaData = await getUser(response.tokens.access);
        setUserData(nuevaData);
        dispatch(
          authActions.updateUser({
            user: response.user,
            accessToken: response.tokens.access,
            refreshToken: response.tokens.refresh,
            image: nuevaData.user_data.profile_picture,
          })
        );
      } else {
        const nuevaData = await getUser(token);
        setUserData(nuevaData);
        dispatch(
          authActions.updateUser({
            user: response.user,
            accessToken: token,
            refreshToken: refreshtoken,
            image: nuevaData.user_data.profile_picture,
          })
        );
      }

      setIsError(false);
      setMessage(updateMessage);
      setShowModal(true);
    } catch (error) {
      setIsError(true);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <>
      <GluttyModal
        isError={isError}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <LoadingGlutty visible={isUpdating} />
      <UpdateProfile
        isCommerce={isCommerce}
        isFetching={isFetching}
        userData={userData}
        onSubmit={submitHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
});
