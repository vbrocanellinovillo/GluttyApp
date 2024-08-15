import { View, StyleSheet } from "react-native";
import Button from "./Button";
import { Colors } from "../../../constants/colors";

export default function FormButtonsGroup({
  prev,
  next,
  onPrev,
  onNext,
  overallContainerStyle,
  buttonContainerStyle,
  buttonStyle,
  buttonTextStyle,
}) {
  return (
    <View style={[styles.buttonsContainer, overallContainerStyle]}>
      <View style={[styles.buttonContainer, buttonContainerStyle]}>
        <Button
          backgroundColor={Colors.locro}
          color={Colors.mJordan}
          onPress={onPrev}
          style={buttonStyle}
          textStyle={buttonTextStyle}
        >
          {prev}
        </Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          backgroundColor={Colors.locro}
          color={Colors.mJordan}
          onPress={onNext}
          style={buttonStyle}
        >
          {next}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 40,
  },

  buttonContainer: {
    flex: 1,
  },
});
