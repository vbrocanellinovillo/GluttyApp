import { Pressable, Image, StyleSheet } from "react-native";
import Header from "./Header";
import IconTextHeader from "./IconTextHeader";

export default function TabsHeader({ navigation, route, options }) {
  function navigateHandler() {
    navigation.navigate("DrawerUser");
  }

  const title = options.title;
  const name = route.name;

  return (
    <Header>
      <IconTextHeader>{title ? title : name}</IconTextHeader>
      <Pressable onPress={navigateHandler}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/profile_images/1605246082144997381/2H9mNjaD_400x400.jpg",
          }}
          style={styles.userImage}
        />
      </Pressable>
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
