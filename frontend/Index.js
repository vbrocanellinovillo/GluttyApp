import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./navigators/AuthNavigation";
import { useSelector } from "react-redux";
import MainDrawer from "./navigators/MainDrawer";

export default function Index() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}
