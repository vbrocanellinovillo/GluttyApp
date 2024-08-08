import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";
import HeaderButtonContainer from "./HeaderButtonContainer";

export default function BackButton({ navigation }) {
  function goBack() {
    navigation.goBack();
  }

  return (
    <HeaderButtonContainer onPress={goBack}>
      <Ionicons name="chevron-back" size={28} color={Colors.oceanBlue} />
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
