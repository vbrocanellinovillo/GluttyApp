import { View, StyleSheet } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import DatePicker from "./DatePicker";
import { Colors } from "../../../constants/colors";
import { useState } from "react";
import {
  formatShortMonth,
} from "../../../utils/dateFunctions";

export default function DateControl({
  title,
  containerStyle,
  titleStyle,
  dateStyle,
  placeholderStyle,
  touched,
  errors,
  value,
  onChange,
}) {
  const [date, setDate] = useState(formatShortMonth(value));

  function handleChangeDate(receivedDate) {
    setDate(receivedDate);
    //onChange(formattedDate);
  }

  return (
    <View style={[styles.dateContainer, containerStyle]}>
      <TextCommonsMedium style={[styles.title, titleStyle]}>
        {title}
      </TextCommonsMedium>
      <DatePicker
        onChange={handleChangeDate}
        touched={touched}
        errors={errors}
        value={date}
        format="short-month"
        style={[styles.dateContol, dateStyle]}
        placeholderStyle={[styles.dateStyle, placeholderStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: Colors.mJordan,
  },

  dateContol: {
    backgroundColor: "#eee",
    borderWidth: 0,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },

  dateStyle: {
    color: Colors.oceanBlue,
    fontSize: 16,
    fontWeight: "500",
  },
});
