import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../context/ui";
import GoBackHeader from "./GoBackHeader";

export default function MedicalExamsHeader({ navigation, options, route }) {
  const dispatch = useDispatch();

  function showInfo() {
    dispatch(uiActions.toggleMedicalDetails());
  }

  return (
    <GoBackHeader navigation={navigation} options={options} route={route}>
      <TouchableOpacity onPress={showInfo}>
        <Ionicons name="information-circle" size={32} color={Colors.locro} />
      </TouchableOpacity>
    </GoBackHeader>
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
    marginRight: 14,
  },
});
