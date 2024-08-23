import { StyleSheet, Text } from "react-native";
import { Drawer } from "react-native-paper";
import { Colors } from "../../../constants/colors";
import DrawerContent from "./DrawerContent";
import { useNavigation } from "@react-navigation/native";

export default function UserDrawerContent() {
  const navigation = useNavigation();

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
    fontSize: 24,
    color: Colors.mJordan,
  },

  buttons: {
    marginTop: 30,
  },
});
