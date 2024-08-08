import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import CommerceTabs from "./navigators/Commerce/CommerceTabs";
import MainUserStack from "./navigators/User/Main/MainUserStack";
import AuthNavigation from "./navigators/Authentication/AuthNavigation"

export default function Index() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <CommerceTabs />
    </NavigationContainer>
  );
}
