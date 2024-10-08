import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import MainUserStack from "./navigators/User/MainUserStack";
import AuthNavigation from "./navigators/Authentication/AuthNavigation";
import { useEffect } from "react";
import MainCommerceStack from "./navigators/Commerce/MainCommerceStack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Feed from "./screens/Community/Feed";
import MyPosts from "./screens/Community/MyPosts";

const Tabs = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="nose" component={Feed} />
      <Tabs.Screen name="ni idea" component={MyPosts} />
    </Tabs.Navigator>
  );
}

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
        <MainCommerceStack />
      ) : (
        <MainUserStack />
      )}
    </NavigationContainer>
  );

  return navigation;
}
