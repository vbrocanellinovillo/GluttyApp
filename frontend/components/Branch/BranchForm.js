import { StyleSheet, View, ScrollView } from "react-native";
import Form from "../UI/Forms/Form";
import FormControl from "../UI/Controls/FormControl";
import FormHeader from "../UI/Forms/FormHeader";
import { Colors } from "../../constants/colors";
import Button from "../UI/Controls/Button";
import { Formik } from "formik";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import CheckboxControl from "../UI/Controls/CheckboxControl";

export default function BranchForm({ onSubmit, branch }) {
  function submitHandler(values) {
    onSubmit();
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <FormHeader title="GLUTTY" />
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
              <CheckboxControl
                title="Cocina separada"
                name="separateKitchen"
                checked={values.separateKitchen}
                setChecked={setFieldValue}
              />
              <CheckboxControl
                title="Solo TakeAway"
                name="onlyTakeAway"
                checked={values.onlyTakeAway}
                setChecked={setFieldValue}
              />
              <View style={styles.buttonContainer}>
                <Button
                  backgroundColor={Colors.locro}
                  color={Colors.mJordan}
                  onPress={handleSubmit}
                >
                  Guardar
                </Button>
              </View>
            </Form>
          )}
        </Formik>
      </ScrollView>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 20,
  },
});
