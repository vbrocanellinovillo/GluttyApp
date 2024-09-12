import { useDispatch, useSelector } from "react-redux";
import CommerceProfileForm from "./CommerceProfileForm";
import { authActions } from "../../context/auth";
import { useState, useEffect } from "react";
import LoadingGlutty from "../UI/Loading/LoadingGlutty";
import GluttyModal from "../UI/GluttyModal";
import NoUserData from "./NoUserData";
import UserDataSkeleton from "../UI/Loading/UserDataSkeleton";
import UserProfileForm from "./UserProfileForm";
import { getUser, update } from "../../services/userService";
import { useNavigation } from "@react-navigation/native";
import UserImage from "../UI/UserImage/UserImage";
import { ScrollView, StyleSheet, View } from "react-native";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";

export default function UpdateProfile({ isCommerce }) {
  const token = useSelector((state) => state.auth.accessToken);
  const refreshtoken = useSelector((state) => state.auth.refreshToken);
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

  if (isFetching) {
    return <UserDataSkeleton />;
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
      <DismissKeyboardContainer>
        <ScrollView>
          <View style={styles.imageContainer}>
            <UserImage dimensions={160} isForm />
          </View>
          {isCommerce ? (
            <CommerceProfileForm
              onSubmit={submitHandler}
              user={userData.user_data}
              commerce={userData.commerce_data}
            />
          ) : (
            <UserProfileForm
              onSubmit={submitHandler}
              user={userData.user_data}
              celiac={userData.celiac_data}
            />
          )}
        </ScrollView>
      </DismissKeyboardContainer>
      <LoadingGlutty visible={isUpdating} />
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
  },
});
