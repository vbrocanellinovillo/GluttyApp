import { Image, StyleSheet, View } from "react-native";
import HeaderTitle from "./HeaderTitle";
import { Ionicons } from "@expo/vector-icons";
import StepIndicator from "react-native-step-indicator";
import { Colors } from "../../../constants/colors";
import { doctorGlutty } from "../../../constants/glutty";

const labels = ["Carga tu estudio", "Completar datos"];

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

export default function AddBloodTestHeader({ route }) {
  const name = route.name;

  let currentPosition;
  switch (name) {
    case "UploadExam":
      currentPosition = 0;
      break;
    case "BloodTest":
      currentPosition = 1;
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <HeaderTitle style={styles.title}>Nuevo estudio</HeaderTitle>
        <Image source={{ uri: doctorGlutty }} style={styles.image} />
      </View>
      <StepIndicator
        customStyles={customStyles}
        labels={labels}
        stepCount={2}
        currentPosition={currentPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 70,
    gap: 50,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
  },

  image: {
    width: 70,
    height: 70,
    objectFit: "contain",
  },

  title: {
    fontSize: 32,
  },
});
