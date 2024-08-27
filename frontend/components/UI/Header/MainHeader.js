import Header from "./Header";
import UserImage from "../UserImage/UserImage";
import { DrawerActions } from "@react-navigation/native";
import HeaderTitle from "./HeaderTitle";
import { View } from "react-native";

export default function MainHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  const name = route.name;
  const title = options.title;

  return (
    <Header>
      <UserImage onPress={toggleDrawer} dimensions={60} />
      <HeaderTitle>{title ? title : name}</HeaderTitle>
      <View style={{ marginRight: 50 }} />
    </Header>
  );
}
