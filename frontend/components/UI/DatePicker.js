import { StyleSheet, Pressable, Text, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Colors } from "../../constants/colors";
import { useState } from "react";

export default function DatePicker({
  placeholder,
  onChange,
  errors,
  touched,
  value,
}) {
  const [open, setOpen] = useState(false);

  const showDatePicker = () => {
    setOpen(true);
  };

  const hideDatePicker = () => {
    setOpen(false);
  };

  const handleConfirm = (date) => {
    onChange(date);
    hideDatePicker();
  };

  console.log(value)

  return (
    <>
      <View style={styles.container}>
        <Pressable
          onPress={showDatePicker}
          style={
            errors && touched
              ? [styles.datePicker, styles.formError]
              : styles.datePicker
          }
        >
          <Text
            style={
              errors && touched
                ? [styles.placeholder, { color: Colors.redError }]
                : [styles.placeholder, { color: "#aaa" }]
            }
          >
            {value? value.toLocaleDateString() : placeholder}
          </Text>
          <DateTimePicker
            isVisible={open}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            mode="date"
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
