import { createDrawerNavigator } from "@react-navigation/drawer";
import MainNavigation from "./MainNavigation";
import DrawerContent from "../components/UI/Navigation/DrawerContent";
import MainHeader from "../components/UI/Header/MainHeader";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <MainHeader navigation={navigation} route={route} options={options} />
        ),
      }}
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Tabs" component={MainNavigation} />
    </Drawer.Navigator>
  );
}
