import { StyleSheet } from "react-native";
import Header from "./Header";
import IconTextHeader from "./IconTextHeader";
import UserImage from "../UserImage";

export default function MainHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.toggleDrawer();
  }

  const name = route.name;

  return (
    <Header>
      <IconTextHeader>{name}</IconTextHeader>
      <UserImage
        image={
          "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg"
        }
        onPress={toggleDrawer}
        width={60}
        height={60}
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
