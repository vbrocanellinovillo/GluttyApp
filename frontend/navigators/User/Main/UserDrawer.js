import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "../../../components/UI/Navigation/DrawerContent";
import UserTabs from "./UserTabs";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={({ navigation }) => (
        <DrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Tabs" component={UserTabs} />
    </Drawer.Navigator>
  );
}
