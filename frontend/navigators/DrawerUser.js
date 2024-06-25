import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/Profile/Profile";
import PrivacityAndSecurity from "../screens/Profile/PrivacityAndSecurity";
import DrawerHeader from "../components/UI/Header/DrawerHeader";

const Drawer = createDrawerNavigator();

export default function DrawerUser() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <DrawerHeader
            navigation={navigation}
            route={route}
            options={options}
          />
        ),
      }}
    >
      <Drawer.Screen name="User" component={Profile} />
      <Drawer.Screen
        name="PrivacityAndSecurity"
        component={PrivacityAndSecurity}
        options={{ title: "Privacidad y Seguridad" }}
      />
    </Drawer.Navigator>
  );
}
