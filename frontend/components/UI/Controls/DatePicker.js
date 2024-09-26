import { StyleSheet, Pressable, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Colors } from "../../../constants/colors";
import { useState } from "react";
import {
  formatDateToYYYYMMDD,
  formatShortMonth,
  formatTime,
} from "../../../utils/dateFunctions";

export default function DatePicker({
  placeholder,
  onChange,
  errors,
  touched,
  value,
  style,
  placeholderStyle,
  mode = "date",
  format = "yyyy-mm-dd",
}) {
  const [open, setOpen] = useState(false);

  const showDatePicker = () => {
    setOpen(true);
  };

  const hideDatePicker = () => {
    setOpen(false);
  };

  const formatDate = (date) => {
    let formattedDate;
    switch (mode) {
      case "date":
        if (format === "yyyy-mm-dd") {
          formattedDate = formatDateToYYYYMMDD(date);
        } else if (format === "short-month") {
          formattedDate = formatShortMonth(date);
        }

        break;

      case "time":
        formattedDate = formatTime(date);
        break;
    }

    return formattedDate;
  };

  const handleConfirm = (date) => {
    const formattedDate = formatDate(date);
    onChange(formattedDate);
    hideDatePicker();
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={showDatePicker}
          style={
            errors && touched
              ? [styles.datePicker, styles.formError, style]
              : [styles.datePicker, style]
          }
        >
          <Text
            style={
              errors && touched
                ? [
                    styles.placeholder,
                    placeholderStyle,
                    { color: Colors.redError },
                  ]
                : value
                ? [styles.placeholder, { color: "black" }, placeholderStyle]
                : [styles.placeholder, { color: "#aaa" }, placeholderStyle]
            }
          >
            {value ? value : placeholder}
          </Text>
          <DateTimePicker
            isVisible={open}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            mode={mode}
          />
        </Pressable>
        {errors && touched && <Text style={styles.errorText}>{errors}</Text>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 12,
  },

  datePicker: {
    height: 50,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.mJordan,
    borderRadius: 8,
    fontSize: 16,
    justifyContent: "center",
    marginBottom: 5,
  },

  placeholder: {
    position: "absolute",
    left: "10%",
  },

  formError: {
    borderWidth: 1,
    borderColor: Colors.redError,
  },

  errorText: {
    fontSize: 16,
    color: Colors.redError,
  },
});
