import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../context/auth";
import { useState, useCallback } from "react";
import { getUser, update } from "../../services/userService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const [isFetching, setIsFetching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [isErrorFetching, setIsErrorFetching] = useState(false);
  const [isErrorUpdating, setIsErrorUpdating] = useState(false);

  const updateMessage = isCommerce
    ? "Datos de comercio actualizados correctamente"
    : "Datos de cuenta actualizados correctamente";

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [token])
  );

  async function getUserData() {
    try {
      setIsFetching(true);
      const response = await getUser(token);
      setUserData(response);
      setIsErrorFetching(false);
    } catch (error) {
      setIsErrorFetching(true);
      setMessage(error.message);
    } finally {
      setIsFetching(false);
    }
  }

  function closeModalHandler() {
    setShowModal(false);
    if (!isErrorUpdating) {
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

      setIsErrorUpdating(false);
      setMessage(updateMessage);
      setShowModal(true);
    } catch (error) {
      setIsErrorUpdating(true);
      setMessage(error.message);
      setShowModal(true);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <>
      <GluttyModal
        isError={isErrorUpdating}
        message={message}
        onClose={closeModalHandler}
        visible={showModal}
      />
      <LoadingGlutty visible={isUpdating} />
      <UpdateProfile
        isCommerce={isCommerce}
        isFetching={isFetching}
        isErrorFetching={isErrorFetching}
        userData={userData}
        onSubmit={submitHandler}
        onRefresh={getUserData}
      />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
});
