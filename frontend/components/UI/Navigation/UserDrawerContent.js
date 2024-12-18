import { StyleSheet, Text } from "react-native";
import { Drawer } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import DrawerContent from "./DrawerContent";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

export default function UserDrawerContent() {
  const navigation = useNavigation();
  const is_admin = useSelector((state) => state.auth.isAdmin);
  console.log("ADMIN:", is_admin);

  return (
    <DrawerContent>
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
      <Drawer.Section title={<Text style={styles.title}>Recetas</Text>}>
        <Drawer.Item
          label="Mis Recetas"
          onPress={() => {
            navigation.navigate("Tabs", { screen: "MyRecipes" });
          }}
          icon="clipboard-text-outline"
        />
      </Drawer.Section>
      
      { is_admin && (
      <Drawer.Section title={<Text style={styles.title}>Administrador</Text>}>
        <Drawer.Item
          label="Panel"
          onPress={() => {
            navigation.navigate("Tabs", { screen: "AdminTopTabs" });
          }}
          icon="tablet-dashboard"
        />
      </Drawer.Section>
      )}
    </DrawerContent>
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
    fontSize: 21,
    color: Colors.mJordan,
  },

  buttons: {
    marginTop: 30,
  },
});
