import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mi Usuario" component={Profile} />
    </Drawer.Navigator>
  );
}