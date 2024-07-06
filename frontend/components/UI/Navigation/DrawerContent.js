import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Drawer } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import UserImage from "../UserImage";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Controls/Button";
import { authActions } from "../../../context/auth";
import { logoutSesion } from "../../../services/userService";

export default function DrawerContent({ navigation, route }) {
  const username = useSelector((state) => state.auth.userData.username);
  const dispatch = useDispatch();

  async function logout() {
    Alert.alert("Cerrar sesión","Cerrar sesión");
    await logoutSesion(username);
    dispatch(authActions.logout());
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <UserImage
          image={
            "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg"
          }
          onPress={() =>
            console.log("apretaste algo que no hace nada. bien ahi crack")
          }
          dimensions={80}
        />
        <Text style={styles.username}>{username}</Text>
      </View>
      <Drawer.Section title={<Text style={styles.title}>Usuario</Text>}>
        <Drawer.Item
          label="Editar datos"
          onPress={() => {
            navigation.navigate("Tabs", { screen: "UserData" });
          }}
          icon="account-details"
        />
        <Drawer.Item
          label="Privacidad y Seguridad"
          onPress={() => {
            navigation.navigate("Tabs", { screen: "PrivacityAndSecurity" });
          }}
          icon="lock"
        />
      </Drawer.Section>
      <View style={styles.buttons}>
        <Button onPress={logout}>Cerrar Sesión</Button>
      </View>
    </ScrollView>
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
