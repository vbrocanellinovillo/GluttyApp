import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/colors";

const DrawerIcon = ({
  onPress = () => {},
  iconSize = 38,
  iconColor = Colors.mJordan,
  iconStyle,
  iconContainerStyle,
}) => {
  function handlePress() {
    onPress && onPress();
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) =>
        pressed
          ? [styles.pressed, styles.iconContainer, iconContainerStyle]
          : [styles.iconContainer, iconContainerStyle]
      }
    >
      <Ionicons
        name="menu"
        color={iconColor}
        size={iconSize}
        style={[styles.menu, iconStyle]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.6,
  },

  menu: {
    paddingRight: 7,
    paddingLeft: 5,
  },
});

export default DrawerIcon;
