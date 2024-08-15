import { StyleSheet, View } from "react-native";
import Header from "./Header";
import HeaderTitle from "./HeaderTitle";
import { Ionicons } from "@expo/vector-icons";
import StepIndicator from "react-native-step-indicator";
import { Colors } from "../../../constants/colors";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";

const labels = [
  "Información General",
  "Dirección",
  "Confirmar en mapa",
  "Fotos (opcional)",
];

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: Colors.locro,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: Colors.locro,
  stepStrokeUnFinishedColor: "#aaaaaa",
  separatorFinishedColor: Colors.locro,
  separatorUnFinishedColor: "#aaaaaa",
  stepIndicatorFinishedColor: Colors.locro,
  stepIndicatorUnFinishedColor: "#ffffff",
  stepIndicatorCurrentColor: "#ffffff",
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: "#fe7013",
  stepIndicatorLabelFinishedColor: "#ffffff",
  stepIndicatorLabelUnFinishedColor: "#aaaaaa",
  labelColor: "#999999",
  labelSize: 13,
  currentStepLabelColor: "#fe7013",
};

export default function AddBranchHeader({ navigation, route, options }) {
  const name = route.name;
  const title = options.title;

  //const currentPosition = route.params?.position;

  let currentPosition;
  switch (name) {
    case "GeneralInfo":
      currentPosition = 0;
      break;
    case "Address":
      currentPosition = 1;
      break;
    case "MapConfirmation":
      currentPosition = 2;
      break;
    case "Photos":
      currentPosition = 3;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="storefront" size={21} color={Colors.mJordan} />
        <HeaderTitle style={styles.title}>Nueva Sucursal</HeaderTitle>
      </View>
      <StepIndicator
        customStyles={customStyles}
        labels={labels}
        stepCount={4}
        currentPosition={currentPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop: 70,
    gap: 50,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  title: {
    fontSize: 32,
  },
});
