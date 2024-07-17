import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import MainDrawer from "./navigators/MainDrawer";
import AuthNavigation from "./navigators/AuthNavigation"

export default function Index() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <MainDrawer />
    </NavigationContainer>
  );
}
