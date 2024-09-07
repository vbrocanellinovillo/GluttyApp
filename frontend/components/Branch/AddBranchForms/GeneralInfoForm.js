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

export default function GeneralInfoForm({ onNext, onCancel, branch }) {
  function submitHandler({
    name,
    phone,
    optionalPhone,
    separatedKitchen,
    onlyTakeAway,
  }) {
    
    // Si el telefono solo es codigo de pais lo borro (maximo 3 caracteres por codigo, ademas del +)
    if (optionalPhone && optionalPhone.trim().length < 5) {
      optionalPhone = "";
    }

    console.log(phone);
    console.log(optionalPhone);
    onNext(name, phone, optionalPhone, separatedKitchen, onlyTakeAway);
  }

  //INITIAL VALUES TENGO QUE AGREGAR LOS VALORES CUANDO PASO LA BRANCH.
  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <Formik
          initialValues={{
            name: branch?.name,
            phone: branch?.phone,
            optionalPhone: branch?.optionalPhone,
            separatedKitchen: branch?.separatedKitchen ?? false,
            onlyTakeAway: branch?.onlyTakeAway ?? false,
          }}
          validate={({
            name,
            phone,
            optionalPhone,
            separatedKitchen,
            onlyTakeAway,
          }) => {
            const errors = {};

            if (name.trim() === "") {
              errors.name = "Nombre requerido";
            }

            // Ver de cuantos números tiene que ser el telefono
            if (phone.trim().length < 7 || phone.trim().length > 15) {
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
