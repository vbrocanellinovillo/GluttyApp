import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import WheelPicker from "@quidone/react-native-wheel-picker";
import DialogContainer from "../UI/DialogContainer";
import { Colors } from "../../constants/colors";

const options = [
  {
    value: 1,
    label: "1 año",
  },
  {
    value: 2,
    label: "6 meses",
  },
  {
    value: 3,
    label: "3 meses",
  },
  {
    value: 4,
    label: "1 mes",
  },
];

export default function ScheduleNextStudy({ onDismiss }) {
  return (
    <DialogContainer onDismiss={onDismiss} containerStyle={styles.container}>
      <TextCommonsMedium style={styles.title}>
        ¿Cuándo te realizarás tu proximo estudio médico?
      </TextCommonsMedium>
      <WheelPicker data={options} />
      <View />
    </DialogContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
  },
});
