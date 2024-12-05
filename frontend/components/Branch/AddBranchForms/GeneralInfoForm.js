import { StyleSheet, View, ScrollView } from "react-native";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import { Colors } from "../../../constants/colors";
import { Formik } from "formik";
import DismissKeyboardContainer from "../../UI/Forms/DismissKeyboadContainer";
import CheckboxControl from "../../UI/Controls/CheckboxControl";
import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";
import PhoneInput from "../../UI/Controls/PhoneInput";
import SchedulePicker from "../ScheduleComponent";
import { useState } from "react";

export default function GeneralInfoForm({ onNext, onCancel, branch }) {
  const [schedules, setSchedules] = useState(
    branch?.schedules || [
      {
        id: 1,
        day: "Lunes",
        min_time: "08:00",
        max_time: "20:00",
      },
    ]
  );


  function submitHandler({
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway,
  }) {
    const form_schedules = formatearSchedules(schedules)
    console.log(schedules)
    console.log("jorariross: ", form_schedules)
    

    if (optionalPhone && optionalPhone?.trim().length < 5) {
      optionalPhone = "";
    }
    console.log("formateooo: ", form_schedules)
    onNext(name, phone, optionalPhone, separatedKitchen, onlyTakeAway, form_schedules);
  }

  function formatearSchedules(schedules){
    const daysOfWeekMapping = {
      Lunes: "1",
      Martes: "2",
      Miércoles: "3",
      Jueves: "4",
      Viernes: "5",
      Sábado: "6",
      Domingo: "7",
    };
  
    return schedules.map(({ day, min_time, max_time }) => ({
      day: daysOfWeekMapping[day],
      min_time: `${min_time}:00`,
      max_time: `${max_time}:00`,
      }))
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: branch?.name || "",
            phone: branch?.phone || "",
            optionalPhone: branch?.optional_phone || "",
            separatedKitchen: branch?.separated_kitchen || "",
            onlyTakeAway: branch?.just_takeaway || "",
          }}
          validate={(values) => {
            const errors = {};
            if (values.name?.trim() === "") {
              errors.name = "Nombre requerido";
            }
            if (values.phone?.trim().length < 7 || values.phone.trim().length > 15) {
              errors.phone = "Se requiere al menos un número de teléfono";
            }
            return errors;
          }}
          onSubmit={submitHandler}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form>
              <FormControl
                label="Nombre"
                value={values.name}
                name="name"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.name}
                errors={errors.name}
                autoCapitalize="words"
              />
              <PhoneInput
                defaultCode={{ code: "+54", flag: "🇦🇷" }}
                label="Teléfono"
                value={values.phone}
                name="phone"
                onChange={(phone) => setFieldValue("phone", phone)}
                handleBlur={handleBlur}
                touched={touched.phone}
                errors={errors.phone}
              />
              <PhoneInput
                defaultCode={{ code: "+54", flag: "🇦🇷" }}
                label="Otro teléfono (opcional)"
                value={values.optionalPhone}
                name="optionalPhone"
                onChange={(optionalPhone) =>
                  setFieldValue("optionalPhone", optionalPhone)
                }
                handleBlur={handleBlur}
                touched={touched.optionalPhone}
                errors={errors.optionalPhone}
              />
              <SchedulePicker
                schedules={schedules}
                setSchedules={setSchedules}
              />
              <View style={styles.checkboxServices}>
                <TextCommonsRegular style={styles.checkboxServicesText}>
                  Servicios Ofrecidos
                </TextCommonsRegular>
                <CheckboxControl
                  title="Cocina separada"
                  name="separatedKitchen"
                  checked={values.separatedKitchen}
                  setChecked={setFieldValue}
                  style={styles.checkbox}
                />
                <CheckboxControl
                  title="Solo TakeAway"
                  name="onlyTakeAway"
                  checked={values.onlyTakeAway}
                  setChecked={setFieldValue}
                  style={styles.checkbox}
                />
              </View>
              <FormButtonsGroup
                prev="Cancelar"
                next="Siguiente"
                onPrev={onCancel}
                onNext={handleSubmit}
              />
            </Form>
          )}
        </Formik>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    alignItems: "center",
    paddingBottom: 230,
  },

  checkboxServices: {
    marginTop: 20,
  },

  checkboxServicesText: {
    fontSize: 16,
  },

  checkbox: {
    backgroundColor: Colors.pielcita,
    borderWidth: 0,
  },
});
