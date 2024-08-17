import { StyleSheet, View, ScrollView } from "react-native";
import Form from "../../UI/Forms/Form";
import FormControl from "../../UI/Controls/FormControl";
import { Colors } from "../../../constants/colors";
import { Formik } from "formik";
import DismissKeyboardContainer from "../../UI/Forms/DismissKeyboadContainer";
import CheckboxControl from "../../UI/Controls/CheckboxControl";
import TextCommonsRegular from "../../UI/FontsTexts/TextCommonsRegular";
import FormButtonsGroup from "../../UI/Controls/FormButtonsGroup";

export default function GeneralInfoForm({ onNext, onCancel }) {
  function submitHandler(values) {
    onNext();
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: "",
            phone: "",
            optionalPhone: "",
            separateKitchen: false,
            onlyTakeAway: false,
          }}
          validate={({
            name,
            phone,
            optionalPhone,
            separateKitchen,
            onlyTakeAway,
          }) => {
            const errors = {};

            if (name.trim() === "") {
              errors.name = "Nombre requerido";
            }

            // Ver de cuantos números tiene que ser el telefono
            if (phone.trim() === "") {
              errors.phone = "Se requiere al menos un número";
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
              <FormControl
                label="Telefono 1"
                value={values.phone}
                name="phone"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.phone}
                errors={errors.phone}
                keyboardType="numeric"
              />
              <FormControl
                label="Otro telefono (opcional)"
                value={values.optionalPhone}
                name="optionalPhone"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.optionalPhone}
                errors={errors.optionalPhone}
                keyboardType="numeric"
              />
              <View style={styles.checkboxServices}>
                <TextCommonsRegular style={styles.checkboxServicesText}>
                  Servicios Ofrecidos
                </TextCommonsRegular>
                <CheckboxControl
                  title="Cocina separada"
                  name="separateKitchen"
                  checked={values.separateKitchen}
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
