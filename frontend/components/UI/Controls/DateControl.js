import { View, StyleSheet } from "react-native";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import DatePicker from "./DatePicker";
import { Colors } from "../../../constants/colors";
import { useState } from "react";
import { formatShortMonth } from "../../../utils/dateFunctions";
import TextCommonsRegular from "../FontsTexts/TextCommonsRegular";

export default function DateControl({
  title,
  containerStyle,
  titleStyle,
  dateStyle,
  placeholderStyle,
  errors,
  value,
  onChange,
}) {
  const [date, setDate] = useState(formatShortMonth(value));

  function handleChangeDate(receivedDate) {
    setDate(receivedDate);
    onChange(receivedDate);
  }

  const hasError = errors !== undefined;

  return (
    <View>
      <View style={[styles.dateContainer, containerStyle]}>
        <TextCommonsMedium
          style={
            hasError
              ? [styles.title, styles.errorText, titleStyle]
              : [styles.title, titleStyle]
          }
        >
          {title}
        </TextCommonsMedium>
        <DatePicker
          onChange={handleChangeDate}
          value={date}
          format="short-month"
          style={
            hasError
              ? [styles.dateContol, styles.errorControl, dateStyle]
              : [styles.dateContol, dateStyle]
          }
          placeholderStyle={
            hasError
              ? [styles.dateStyle, styles.errorText, placeholderStyle]
              : [styles.dateStyle, placeholderStyle]
          }
        />
      </View>
      {hasError && (
        <TextCommonsRegular style={styles.errorText}>
          {errors}
        </TextCommonsRegular>
      )}
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

  errorControl: {
    shadowColor: Colors.redError,
    shadowRadius: 6,
    shadowOpacity: 0.6
  },

  errorText: {
    color: Colors.redError,
  },
});
