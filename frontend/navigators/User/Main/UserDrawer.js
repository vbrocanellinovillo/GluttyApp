import { createDrawerNavigator } from "@react-navigation/drawer";
import UserTabs from "./UserTabs";
import UserDrawerContent from "../../../components/UI/Navigation/UserDrawerContent";
const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={({ navigation }) => (
        <UserDrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Tabs" component={UserTabs} />
    </Drawer.Navigator>
  );
}
