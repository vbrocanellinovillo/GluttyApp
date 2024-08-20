import { createDrawerNavigator } from "@react-navigation/drawer";
import CommerceTabs from "./CommerceTabs";
import CommerceDrawerContent from "../../components/UI/Navigation/CommerceDrawerContent";
const Drawer = createDrawerNavigator();

export default function CommerceDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={({ navigation }) => (
        <CommerceDrawerContent navigation={navigation} />
      )}
    >
      <Drawer.Screen name="Tabs" component={CommerceTabs} />
    </Drawer.Navigator>
  );
}