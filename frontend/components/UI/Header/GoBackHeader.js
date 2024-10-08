import Header from "./Header";
import HeaderTitle from "./HeaderTitle";
import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../constants/colors";
import * as Haptics from "expo-haptics";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";

export default function GoBackHeader({
  navigation,
  children,
  route,
  options,
  gradient = true,
  containerStyle,
  titleStyle,
  iconStyle,
  backIcon,
}) {
  function goBack() {
    Haptics.selectionAsync();
    navigation.goBack();
  }

  const name = route.name;
  const title = options.title;

  return (
    <Header style={[styles.container, containerStyle]}>
      <TouchableOpacity style={[styles.backIcon, iconStyle]} onPress={goBack}>
        <Ionicons
          name={backIcon || "chevron-back"}
          size={26}
          color={Colors.mJordan}
        />
      </TouchableOpacity>
      {gradient ? (
        <HeaderTitle style={titleStyle}>{title ? title : name}</HeaderTitle>
      ) : (
        <TextCommonsMedium style={[styles.titleStyle, titleStyle]}>
          {title ? title : name}
        </TextCommonsMedium>
      )}
      {children}
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  backIcon: {
    marginRight: 6,
  },

  titleStyle: {
    fontSize: 30,
    color: Colors.mJordan,
  },
});
