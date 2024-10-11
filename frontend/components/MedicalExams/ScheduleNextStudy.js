import { StyleSheet, View , Text} from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import WheelPicker from "@quidone/react-native-wheel-picker";
import DialogContainer from "../UI/DialogContainer";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import Button from "../UI/Controls/Button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { postDateNextExam } from "../../services/medicalExamService";
import { useSelector } from "react-redux";
import { err } from "react-native-svg";

const days = [
  { value: 1, label: "1" }, { value: 2, label: "2" }, { value: 3, label: "3" }, 
  { value: 4, label: "4" }, { value: 5, label: "5" }, { value: 6, label: "6" }, 
  { value: 7, label: "7" }, { value: 8, label: "8" }, { value: 9, label: "9" }, 
  { value: 10, label: "10" }, { value: 11, label: "11" }, { value: 12, label: "12" }, 
  { value: 13, label: "13" }, { value: 14, label: "14" }, { value: 15, label: "15" }, 
  { value: 16, label: "16" }, { value: 17, label: "17" }, { value: 18, label: "18" }, 
  { value: 19, label: "19" }, { value: 20, label: "20" }, { value: 21, label: "21" }, 
  { value: 22, label: "22" }, { value: 23, label: "23" }, { value: 24, label: "24" }, 
  { value: 25, label: "25" }, { value: 26, label: "26" }, { value: 27, label: "27" }, 
  { value: 28, label: "28" }, { value: 29, label: "29" }, { value: 30, label: "30" }, 
  { value: 31, label: "31" }
];

const months = [
  {
    value: 1,
    label: "Enero",
  },
  {
    value: 2,
    label: "Febrero",
  },
  {
    value: 3,
    label: "Marzo",
  },
  {
    value: 4,
    label: "Abril",
  },
  {
    value: 5,
    label: "Mayo",
  },
  {
    value: 6,
    label: "Junio",
  },
  {
    value: 7,
    label: "Julio",
  },
  {
    value: 8,
    label: "Agosto",
  },
  {
    value: 9,
    label: "Septiembre",
  },
  {
    value: 10,
    label: "Octubre",
  },
  {
    value: 11,
    label: "Noviembre",
  },
  {
    value: 12,
    label: "Diciembre",
  },
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 80 }, (_, index) => ({
  value: currentYear + index,
  label: (currentYear + index).toString(),
}));

export default function ScheduleNextStudy({ onDismiss, time, getData }) {
  const [value, setValue] = useState(time || 2);
  // const [day, setValueDay] = useState(time || 2);
  // const [month, setValueMonth] = useState(time || 2);
  const [day, setValueDay] = useState(time || 1);
  const [month, setValueMonth] = useState(time || 1);
  const [year, setValueYear] = useState(time || currentYear);

  const [isError, setIsError] = useState(false);
  const[isBefore, setIsBefore] = useState(false);
  const[isLoading, setIsLoading] = useState(false);

  const token = useSelector(state=>state.auth.accessToken);
  const username = useSelector(state=>state.auth.userData.username);

  // function handleValueChange(item) {
  //   Haptics.selectionAsync();
  //   setValue(item.item.value);
  // }

  function handleValueChangeDay(item) {
    Haptics.selectionAsync();
    setValueDay(item.item.value);
  }

  function handleValueChangeMonth(item) {
    Haptics.selectionAsync();
    setValueMonth(item.item.value);
  }

  function handleValueChangeYear(item) {
    Haptics.selectionAsync();
    setValueYear(item.item.value);
  }

  const handlePress = async () => {
    const selectedDate = `${day}.${month}.${year}`;
    const dateBackend = `${year}-${month}-${day}`;
    
    if (!isValidDate(selectedDate)) {
      console.log("Fecha inválida");
      return;
    }

    
    const currentDate = new Date();

    //se guarda mal xd cuando lo pasa a fecha
    const selectedDateObj = new Date(year, month - 1, day); 


    if (selectedDateObj <= currentDate) {
      console.log(selectedDateObj);
      console.log(selectedDate);
      console.log("La fecha seleccionada debe ser mayor a la actual.");
      setIsError(true);
      return;
    }

    console.log("Fecha válida y mayor a la actual:", selectedDate);
    setIsError(false);
    setIsLoading(true);
    try{
      await postDateNextExam(token, dateBackend, username)
      console.log("wtft");
      getData();
      onDismiss();
      
    }catch (error) {
      console.log("error choto");
      console.log(error)
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <DialogContainer onDismiss={onDismiss} containerStyle={styles.container}>
      <TextCommonsMedium style={styles.title}>
        ¿Cuándo te realizarás tu proximo estudio médico?
      </TextCommonsMedium>
      <View style={{flexDirection:"row", justifyContent:"center"}}>
        <WheelPicker
          data={days}
          value={day}
          onValueChanged={handleValueChangeDay}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          } 
          style={[styles.wheelPicker, { marginRight: 15 }]}
        /> 
        <WheelPicker
          data={months}
          value={month}
          onValueChanged={handleValueChangeMonth}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
          style={[styles.wheelPicker, { marginHorizontal: 15 }]}
        /> 
        <WheelPicker
          data={years}
          value={year}
          onValueChanged={handleValueChangeYear}
          onValueChanging={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
          style={[styles.wheelPicker, { marginLeft: 15 }]}
        /> 
        
      </View>
      {isError && <Text>Fecha invalida xd</Text>}
      {/* <DateTimePicker isVisible={true} display="spinner" onConfirm={() => undefined} onCancel={() => undefined}/> */}
      <Button backgroundColor={Colors.locro} onPress={handlePress} isLoading={isLoading}>
        {time ? "Cancelar recordatorio" : "Agendar"}
      </Button>
    </DialogContainer>
  );
}

//aca deberia recibir tipo dd.mm.aaaa
const isValidDate = (dateString) => {
  const [day, month, year] = dateString.split('.').map(Number);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const daysInMonth = (month) => [31, 28 + (isLeapYear(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  return day <= daysInMonth(month);
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
    marginBottom: -40,
  },

  wheelPicker: {
    marginTop: -15,
  },
});
