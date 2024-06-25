import { StyleSheet, View, Image } from "react-native";
import GradientText from "../GradientText";
import HeaderTitle from "./HeaderTitle";

export default function IconTextHeader({ children }) {
  return (
    <View style={styles.iconView}>
      <Image
        source={require("../../../assets/images/sin-gluten.webp")}
        style={styles.icon}
      />
      <HeaderTitle>{children}</HeaderTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 60,
    height: 60,
    objectFit: "fill",
  },
});
