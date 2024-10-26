import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AuthNavigation from "./navigators/Authentication/AuthNavigation";
import { useEffect } from "react";
import MainNavigation from "./navigators/MainNavigation";


export default function Index() {
  const accessToken = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      return;
    }
  }, [accessToken, dispatch]);

  return (
    <NavigationContainer>
      {!accessToken ? <AuthNavigation /> : <MainNavigation />}
    </NavigationContainer>
  );
}
