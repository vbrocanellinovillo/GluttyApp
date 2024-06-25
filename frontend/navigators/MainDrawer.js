import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigation from "./MainNavigation";
import DrawerContent from "../components/UI/Navigation/DrawerContent";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Tabs" component={MainNavigation} />
    </Drawer.Navigator>
  );
}
