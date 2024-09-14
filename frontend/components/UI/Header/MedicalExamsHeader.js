import Header from "./Header";
import HeaderTitle from "./HeaderTitle";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../context/ui";
import * as Haptics from "expo-haptics";

export default function MedicalExamsHeader({ navigation }) {
  const dispatch = useDispatch();

  function showInfo() {
    dispatch(uiActions.toggleMedicalDetails());
  }

  function goBack() {
    Haptics.selectionAsync();
    navigation.goBack();
  }

  return (
    <Header>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backIcon} onPress={goBack}>
          <Ionicons name="chevron-back" size={26} color={Colors.mJordan} />
        </TouchableOpacity>
        <HeaderTitle>Mis Estudios</HeaderTitle>
        <TouchableOpacity onPress={showInfo}>
          <Ionicons name="information-circle" size={32} color={Colors.locro} />
        </TouchableOpacity>
      </View>
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  backIcon: {
    marginRight: 14,
  },
});
