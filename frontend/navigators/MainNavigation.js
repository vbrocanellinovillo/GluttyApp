import { createDrawerNavigator } from "@react-navigation/drawer";
import TabNavigation from "./TabNavigation";
import { useDispatch, useSelector } from "react-redux";
import { routerActions } from "../context/route";

const MainNav = createDrawerNavigator();

export default function MainNavigation() {
  const route = useSelector((state) => state.router.route);
  return (
    <MainNav.Navigator>
      <MainNav.Screen name="DrawerHome">
        {() => {
          return <TabNavigation initialRoute={route} />;
        }}
      </MainNav.Screen>
      <MainNav.Screen name="DrawerOtro">
        {() => {
          return <TabNavigation initialRoute={route} />;
        }}
      </MainNav.Screen>
      <MainNav.Screen name="DrawerProfile">
        {() => {
          return <TabNavigation initialRoute={route} />;
        }}
      </MainNav.Screen>
    </MainNav.Navigator>
  );
}
