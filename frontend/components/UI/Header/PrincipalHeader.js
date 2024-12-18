import { Image, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header";
import { Colors } from "../../../constants/colors";
import UserImage from "../UserImage/UserImage";
import * as Haptics from "expo-haptics";
import { gluttyTitulo } from "../../../constants/glutty";
import DrawerIcon from "./DrawerIcon";

export default function PrincipalHeader({ navigation, goBack }) {
  function toggleDrawer() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.toggleDrawer();
  }

  function handleBack() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    navigation.goBack();
  }

  return (
    <Header style={styles.header}>
      <View style={styles.textContainer}>
        {goBack ? (
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => {
              [pressed && styles.pressed];
            }}
          >
            <Ionicons
              name="arrow-back-circle"
              color={Colors.mJordan}
              size={38}
              style={styles.backIcon}
            />
          </Pressable>
        ) : (
          <DrawerIcon onPress={toggleDrawer} />
        )}
        <Image
          source={{
            uri: gluttyTitulo,
          }}
          style={styles.image}
        />
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

  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  pressed: {
    opacity: 0.7,
  },

  backIcon: {
    paddingHorizontal: 10,
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

  image: {
    height: 42,
    width: 135,
  },
});
