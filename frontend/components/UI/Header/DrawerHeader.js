import { View, Image, StyleSheet } from "react-native";
import Header from "./Header";
import { Colors } from "../../../constants/colors";
import GradientText from "../GradientText";
import { IconButton } from "react-native-paper";
import { useSelector } from "react-redux";
import IconTextHeader from "./IconTextHeader";

export default function DrawerHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.toggleDrawer();
  }

  const routeName = route.name;
  let title = options.title;

  const name = useSelector((state) => state.auth.userData.first_name);

  let content = title ? title : routeName;

  if (routeName === "User") {
    content = "Hola" + " " + name;
  }

  return (
    <Header>
      <IconTextHeader>{content}</IconTextHeader>
      <IconButton
        icon="menu"
        iconColor={Colors.mJordan}
        size={32}
        onPress={toggleDrawer}
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
