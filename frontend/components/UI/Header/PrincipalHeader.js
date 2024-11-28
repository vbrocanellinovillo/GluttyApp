import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import { Colors } from "../../../constants/colors";
import UserImage from "../UserImage/UserImage";
import * as Haptics from "expo-haptics";
import { gluttyTitulo } from "../../../constants/glutty";

export default function PrincipalHeader({ options, navigation }) {
  function toggleDrawer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.toggleDrawer();
  }

  return (
    <Header style={styles.header}>
      <View style={styles.textContainer}>
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
        <Image
        source={{
          uri: gluttyTitulo}}
        style={styles.image}
      />
        {/* <TextCommonsBold style={styles.text}>
          Glutty.
          <TextCommonsMedium style={styles.title}>
            {options.title}
          </TextCommonsMedium>
        </TextCommonsBold> */}
      </View>
      <UserImage dimensions={68} onPress={toggleDrawer} />
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
