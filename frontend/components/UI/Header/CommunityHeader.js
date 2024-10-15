import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import UserImage from "../UserImage/UserImage";
import * as Haptics from "expo-haptics";

export default function CommunityHeader({ options, navigation }) {
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
          <Ionicons name="menu" color={Colors.mJordan} size={50} />
        </Pressable>
        <TextCommonsMedium style={styles.text}>
          Glutty.
          <TextCommonsMedium style={styles.title}>
            {options.title}
          </TextCommonsMedium>
        </TextCommonsMedium>
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
    fontWeight: "700",
    color: Colors.mJordan,
  },

  title: {
    fontSize: 38,
    fontWeight: "700",
    color: Colors.locro,
  },
});
