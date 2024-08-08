import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/colors";
import HeaderButtonContainer from "./HeaderButtonContainer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FindProductsButton({ navigation }) {
  function findProducts() {
    navigation.navigate("Productos");
  }

  return (
    <HeaderButtonContainer onPress={findProducts}>
      <MaterialCommunityIcons
        name="tag-search-outline"
        size={28}
        color={Colors.oceanBlue}
      />
    </HeaderButtonContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
});
