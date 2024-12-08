import Header from "./Header";
import UserImage from "../UserImage/UserImage";
import { DrawerActions } from "@react-navigation/native";
import HeaderTitle from "./HeaderTitle";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

export default function SecondaryHeader({ navigation, route, options }) {
  function toggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer());
  }

  const name = route.name;
  const title = options.title;

  return (
    <Header>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.pressed, styles.iconContainer]
            : [styles.iconContainer]
        }
        onPress={toggleDrawer}
      >
        <Ionicons
          name="menu"
          color={Colors.mJordan}
          size={38}
          style={styles.menu}
        />
      </Pressable>
      <HeaderTitle>{title ? title : name}</HeaderTitle>
      <UserImage onPress={toggleDrawer} dimensions={60} />
    </Header>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingLeft: 6,
  },

  iconContainer: {
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.6,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 38,
    fontWeight: "900",
    color: Colors.mJordan,
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: Colors.locro,
  },
  menu: {
    paddingRight: 7,
    paddingLeft: 5,
  },
  image: {
    height: 42,
    width: 135,
  },
});
