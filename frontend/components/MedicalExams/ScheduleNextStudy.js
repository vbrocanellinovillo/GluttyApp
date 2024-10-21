import { StyleSheet, View , Text} from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import WheelPicker from "@quidone/react-native-wheel-picker";
import DialogContainer from "../UI/DialogContainer";
import { Colors } from "../../constants/colors";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import Button from "../UI/Controls/Button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { cancelDateNextExam, postDateNextExam } from "../../services/medicalExamService";
import { useSelector } from "react-redux";
import { err } from "react-native-svg";
import { Ionicons } from '@expo/vector-icons';
import GluttyModal from "../UI/GluttyModal";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { useEffect } from "react";

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

function convertDate(dateStr) {
  // Crear un objeto Date a partir del string de fecha
  const date = new Date(dateStr);

  // Definir los meses en español
  const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Obtener día, mes y año
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  // Formatear la fecha en el formato deseado
  return `${day} de ${month} de ${year}`;
}


export default function ScheduleNextStudy({ onDismiss, time, getData }) {
  const [value, setValue] = useState( 2);
  // const [day, setValueDay] = useState(time || 2);
  // const [month, setValueMonth] = useState(time || 2);

  const [day, setValueDay] = useState(1);
  const [month, setValueMonth] = useState(1);
  const [year, setValueYear] = useState(currentYear);


  const [isError, setIsError] = useState(false);
  const[isBefore, setIsBefore] = useState(false);
  const[isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");



  const token = useSelector(state=>state.auth.accessToken);
  const username = useSelector(state=>state.auth.userData.username);
  const dateToString = convertDate(time);
  

  const [isScheduled, SetScheduled] = useState(true);
  console.log("timpo: " + time)
  console.log(dateToString);

  useEffect(() => {
    if (time != null) {
      console.log("Ya existe recordatorio");
      SetScheduled(false);  // Se ejecuta una sola vez cuando se monta el componente o cambia 'time'
    }
  }, [time]); 


  const ErrorMessage = () => {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={16} color="red" style={styles.icon} />
        <Text style={styles.errorText}>Fecha inválida</Text>
      </View>
    );
  };
  const BeforeMessage = () => {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={16} color="red" style={styles.icon} />
        <Text style={styles.errorText}>La fecha debe ser mayor a la actual</Text>
      </View>
    );
  };

  // function handleValueChange(item) {
  //   Haptics.selectionAsync();
  //   setValue(item.item.value);
  // }

  function handleValueChangeDay(item) {
    Haptics.selectionAsync();
    console.log("dia seleccionado", item.item.value);
    setValueDay(item.item.value);
  }

  function handleValueChangeMonth(item) {
    Haptics.selectionAsync();
    console.log("mes seleccionado", item.item.value);
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
      setIsError(true);
      setIsBefore(false);
      return;
    }

    
    const currentDate = new Date();

    const selectedDateObj = new Date(Date.UTC(year, month-1, day)); 
    currentDate.setHours(0, 0, 0, 0); // Establecemos la hora en 00:00:00
  


    if (selectedDateObj < currentDate) {
      console.log(selectedDateObj);
      console.log(selectedDate);
      console.log("La fecha seleccionada debe ser mayor a la actual.");
      setIsBefore(true);
      setIsError(false);
      return;
    }

    console.log("Fecha válida y mayor a la actual:", selectedDate);
    setIsError(false);
    setIsBefore(false);
    setIsLoading(true);
    try{
      await postDateNextExam(token, dateBackend, username)
      console.log("wtft");
      SetScheduled(false);
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
  console.log("Que onda")
  console.log(isScheduled)

  function closeModalHandler() {
    setShowModal(false);
  }


  async function cancelSchedule(){
    try {
      onDismiss()
      setIsLoading(true)
      const response = await cancelDateNextExam(token)
      setMessage("Recordatorio eliminalo correctamente")
      setShowModal(true)
    } catch (error) {
      setIsError(true);
      setMessage(error.message);  // Si hay error, mostrar el mensaje de error
      setShowModal(true);
    }
    finally{
      setIsLoading(false)
      getData()
    }
  }


  if (isScheduled) {
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
        {isError && <ErrorMessage />}
        {isBefore && <BeforeMessage/>}
        {/* <DateTimePicker isVisible={true} display="spinner" onConfirm={() => undefined} onCancel={() => undefined}/> */}
        <Button backgroundColor={Colors.locro} onPress={handlePress} isLoading={isLoading}>
            Agendar
        </Button>
      </DialogContainer>
    );
  }else{
    return(
    <>
    <GluttyModal
      isError={isError}
      message={message}
      onClose={closeModalHandler}
      visible={showModal}
    />
    <DialogContainer onDismiss={onDismiss} containerStyle={styles.container}>
      <TextCommonsMedium style={styles.reminder}>
      Próximo recordatorio: {"\n"} {dateToString}
      </TextCommonsMedium>
    <TextCommonsMedium style={styles.title}>
      
      ¿Deseas cancelarlo? 
    </TextCommonsMedium>
    <View style={styles.buttonContainer}>
      <Button 
        style={[styles.actionButton, styles.keepButton]} 
        onPress={() => onDismiss()}
      >
        <Text style={styles.buttonText}>Mantener recordatorio</Text>
      </Button>
      <Button 
        style={[styles.actionButton, styles.cancelButton]} 
        onPress={() => cancelSchedule()}
      >
        <Text style={styles.buttonText}>Borrarlo</Text>
      </Button>
    </View>
  </DialogContainer>
  </>
  )
  }

  
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

  reminder: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.mJordan,
    textAlign: "center",
    marginBottom: 10,
  },


  wheelPicker: {
    marginTop: -15,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ffe6e6',
    borderRadius: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  icon: {
    marginRight: 4,
  },

  buttonContainer: {
    //flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 60,
  },
  
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 5
  },
  
  keepButton: {
    backgroundColor: "#f4a261",
    //marginRight:20
  },
  
  cancelButton: {
    backgroundColor: "#e76f51",
  },
  
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  }
  
});
