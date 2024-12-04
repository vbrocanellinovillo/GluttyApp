import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Picker from "../UI/Controls/Picker";
import CheckboxControl from "../UI/Controls/CheckboxControl";

const SchedulePicker = ({ schedules, setSchedules, isConsulting=false }) => {
  const [allSame, setAllSame] = useState(false);

  const daysOfWeek = [
    { label: "Lunes", value: "Lunes" },
    { label: "Martes", value: "Martes" },
    { label: "Miércoles", value: "Miércoles" },
    { label: "Jueves", value: "Jueves" },
    { label: "Viernes", value: "Viernes" },
    { label: "Sábado", value: "Sábado" },
    { label: "Domingo", value: "Domingo" },
  ];

  const hours = Array.from({ length: 24 }, (_, hour) => {
    const formattedHour = hour.toString().padStart(2, "0");
    return ["00", "15", "30", "45"].map((minute) => ({
      label: `${formattedHour}:${minute}`,
      value: `${formattedHour}:${minute}`,
    }));
  }).flat();

  const handleCheckboxChange = (name, checked) => {
    setAllSame(checked);
    if (checked) {
      const { min_time, max_time } = schedules[0];
      const updatedSchedules = daysOfWeek.map((day, index) => ({
        id: index + 1,
        day: day.label,
        min_time,
        max_time,
      }));
      setSchedules(updatedSchedules);
    } else {
      setSchedules([schedules[0]]);
    }
  };

  const addSchedule = () => {
    setSchedules((prevSchedules) => [
      ...prevSchedules,
      {
        id: Date.now(),
        day: "Lunes",
        min_time: "00:00",
        max_time: "00:00",
      },
    ]);
  };

  const updateSchedule = (id, field, value) => {
    //Agregar validación de horarios

    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === id ? { ...schedule, [field]: value } : schedule
      )
    );
  };
  

  const removeSchedule = (id) => {
    console.log("Estoy eliminando")
    console.log(schedules)
    setSchedules((prevSchedules) =>
      prevSchedules.filter((schedule) => schedule.id !== id)
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horarios del local</Text>
      {schedules.map((schedule) => (
        <View key={schedule.id} style={styles.scheduleRow}>
          {/* Selector de día */}
          <Picker
            data={daysOfWeek}
            value={schedule.day}
            onValueChange={(label) => updateSchedule(schedule.id, "day", label)}
            textStyle={styles.textStyle}
            cointainerStyle={styles.pickerCointaner}
            dropButton = {false}
            isConsulting = {isConsulting}
          />
          {/* Selector de hora de inicio */}
          <Picker
            data={hours}
            value={schedule.min_time}
            cointainerStyle={styles.pickerHour}
            textStyle={styles.textStyle}
            dropButton = {false}
            isConsulting = {isConsulting}
            onValueChange={(value) =>
              updateSchedule(schedule.id, "min_time", value)
            
            }
          />
          <Text style={styles.toText}>a</Text>
          {/* Selector de hora de fin */}
          <Picker
            data={hours}
            value={schedule.max_time}
            cointainerStyle={styles.pickerHour}
            textStyle={styles.textStyle}
            dropButton = {false}
            isConsulting = {isConsulting}
            onValueChange={(value) =>
              updateSchedule(schedule.id, "max_time", value)
            }
          />
          {/* Botón para eliminar */}
          {(schedule.id != 1 && !isConsulting) && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeSchedule(schedule.id)}
          >
            <Text style={styles.removeText}>-</Text>
          </TouchableOpacity>)}
        </View>
      ))}
      {/* Botón para agregar nuevo horario */}
      {(!allSame && !isConsulting) && (
      <TouchableOpacity style={styles.addButton} onPress={addSchedule}>
        <Text style={styles.addText}>+ Agregar nuevo horario</Text>
      </TouchableOpacity>)}
      {/* Botón para hacer todos los días iguales */}
      { (!isConsulting) && (
    <CheckboxControl
        title="Todos mis horarios son iguales"
        checked={allSame}
        setChecked={handleCheckboxChange}
        name="allSame"
        style={styles.checkbox}
      />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  pickerCointaner: {
    width: 85,
    marginRight: 15
  },
  pickerHour:{
    width: 80
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  toText: {
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: "#ffcccc",
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  removeText: {
    color: "#b30000",
    fontSize: 18,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#FBD0A4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addText: {
    color: "#463333",
    fontWeight: "bold",
    fontSize: 16,
  },
  textStyle:{
    fontSize: 14
  }
});

export default SchedulePicker;
