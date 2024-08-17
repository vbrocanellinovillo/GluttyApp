import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import CommerceTabs from "./navigators/Commerce/CommerceTabs";
import MainUserStack from "./navigators/User/Main/MainUserStack";
import AuthNavigation from "./navigators/Authentication/AuthNavigation";
import { useEffect } from "react";
import MainCommerceStack from "./navigators/Commerce/MainCommerceStack";
import AddBranchStack from "./navigators/Commerce/AddBranchStack.js";

export default function Index() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const isCommerce = useSelector((state) => state.auth.isCommerce);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
  }, [accessToken, dispatch]);

  const navigation = (
    <NavigationContainer>
      {!accessToken ? (
        <AuthNavigation />
      ) : isCommerce ? (
        <CommerceTabs />
      ) : (
        <MainUserStack />
      )}
    </NavigationContainer>
  );

  return (
    <NavigationContainer>
      <MainCommerceStack />
    </NavigationContainer>
  );
}
