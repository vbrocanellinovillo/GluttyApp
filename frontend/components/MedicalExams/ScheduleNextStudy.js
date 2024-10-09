import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import WheelPicker from "@quidone/react-native-wheel-picker";
import DialogContainer from "../UI/DialogContainer";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import Button from "../UI/Controls/Button";
import DateTimePicker from "react-native-modal-datetime-picker";

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

export default function ScheduleNextStudy({ onDismiss, time }) {
  const [value, setValue] = useState(time || 2);
  const [day, setValueDay] = useState(time || 2);
  const [month, setValueMonth] = useState(time || 2);

  function handleValueChange(item) {
    Haptics.selectionAsync();
    setValue(item.item.value);
  }

  function handleValueChangeDay(day) {
    Haptics.selectionAsync();
    setValue(day);
  }

  function handleValueChangeMonth(month) {
    Haptics.selectionAsync();
    setValue(item.item.value);
  }

  return (
    <DialogContainer onDismiss={onDismiss} containerStyle={styles.container}>
      <TextCommonsMedium style={styles.title}>
        ¿Cuándo te realizarás tu proximo estudio médico?
      </TextCommonsMedium>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <WheelPicker
          data={options}
          value={value}
          onValueChanged={handleValueChange}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
          style={styles.wheelPicker}
        /> 
        <WheelPicker
          data={options}
          value={value}
          onValueChanged={handleValueChange}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
          style={styles.wheelPicker}
        /> 
        <WheelPicker
          data={options}
          value={value}
          onValueChanged={handleValueChange}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
          style={styles.wheelPicker}
        /> 
      </View>
      
      {/* <DateTimePicker isVisible={true} display="spinner" onConfirm={() => undefined} onCancel={() => undefined}/> */}
      <Button backgroundColor={Colors.locro} onPress={() => undefined}>
        {time ? "Cancelar recordatorio" : "Agendar"}
      </Button>
    </DialogContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
  },

  wheelPicker: {
    marginTop: -15,
  },
});
