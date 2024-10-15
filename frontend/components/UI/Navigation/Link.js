import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";

export default function Link({ href, children, color }) {
  const navigation = useNavigation();

  function navigateHandler() {
    Haptics.selectionAsync();
    navigation.navigate(href);
  }

  return (
    <TouchableOpacity onPress={navigateHandler}>
      <Text style={[styles.navText, { color }]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
