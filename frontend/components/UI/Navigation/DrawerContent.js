import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../../constants/colors";
import UserImage from "../UserImage/UserImage";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Controls/Button";
import { authActions } from "../../../context/auth";
import { logoutSesion } from "../../../services/userService";
import GluttyModal from "../GluttyModal";
import { useState } from "react";
import LoadingGlutty from "../Loading/LoadingGlutty";

export default function DrawerContent({ children }) {
  const username = useSelector((state) => state.auth.userData.username);
  const token = useSelector((state) => state.auth.accessToken);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  function toggleConfirmModal() {
    setShowLogoutConfirm(!showLogoutConfirm);
  }

  function toggleErrorModal() {
    setIsError(false);
  }

  function confirmLogout() {
    setShowLogoutConfirm(true);
  }

  function handleConfirmLogout() {
    setShowLogoutConfirm(false);
    logout();
  }

  async function logout() {
    setIsLoading(true);
    try {
      await logoutSesion(username, token);
      dispatch(authActions.logout());
      setIsError(false);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.userInfo}>
          <UserImage
            onPress={() =>
              console.log("apretaste algo que no hace nada. bien ahi crack")
            }
            dimensions={80}
          />
          <Text style={styles.username}>{username}</Text>
        </View>
        {children}
        <View style={styles.buttons}>
          <Button onPress={confirmLogout}>Cerrar Sesión</Button>
        </View>
      </ScrollView>
      <GluttyModal
        visible={showLogoutConfirm}
        onClose={toggleConfirmModal}
        message="¿Seguro que desea cerrar sesión?"
        other
        buttons={[
          {
            text: "Confirmar",
            bg: "green",
            color: Colors.whiteGreen,
            onPress: handleConfirmLogout,
          },
        ]}
        closeButtonText="Cancelar"
      />
      <GluttyModal
        visible={isError}
        onClose={toggleErrorModal}
        message="Ocurrio un error al cerrar sesión. Por favor intente de nuevo mas tarde"
        isError={true}
      />
      <LoadingGlutty visible={isLoading} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },

  userInfo: {
    marginVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  username: {
    fontSize: 18,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  title: {
    fontSize: 24,
    color: Colors.mJordan,
  },

  buttons: {
    marginTop: 30,
  },
});
