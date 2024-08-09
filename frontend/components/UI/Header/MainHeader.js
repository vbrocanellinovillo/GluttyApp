import { StyleSheet } from "react-native";
import Header from "./Header";
import IconTextHeader from "./IconTextHeader";
import UserImage from "../UserImage";
import { DrawerActions } from "@react-navigation/native";

export default function MainHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  const name = route.name;
  const title = options.title;

  return (
    <Header>
      <IconTextHeader>{title ? title : name}</IconTextHeader>
      <UserImage
        onPress={toggleDrawer}
        dimensions={60}
      />
    </Header>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    objectFit: "fill",
  },
});
