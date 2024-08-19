import { ScrollView, StyleSheet, View } from "react-native";
import Form from "../UI/Forms/Form";
import FormHeader from "../UI/Forms/FormHeader";
import FormTitle from "../UI/Forms/FormTitle";
import FormControl from "../UI/Controls/FormControl";
import FormGroup from "../UI/Forms/FormGroup";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";
import Combobox from "../UI/Controls/Combobox";
import DatePicker from "../UI/Controls/DatePicker";
import { Formik } from "formik";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";


export default function CommerceProfileForm({ onSubmit, user, commerce }) {
  function submitHandler({
    cuit,
    name,
    email,
    username,
    description,

  }) {
    onSubmit(email, username, cuit, name, description);
  }

  return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ alignItems: "center" }}
        >
        <Formik
          initialValues={{
            name: commerce.name,
            nombreUsuario: user.username,
            email: user.email,
            cuit: commerce.cuit,
            description: commerce.description,
          }}
          validate={({
            nombreUsuario,
            email,
          }) => {
            const errors = {};
            if (nombreUsuario.trim() === "") {
              errors.nombreUsuario = "Nombre de usuario requerido";
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              errors.email = "Email invalido";
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
              <FormTitle>Datos de Comercio</FormTitle>

              <FormControl
                label="Nombre de Comercio"
                value={values.name}
                name="nombreComercio"
                handleChange={handleChange}
                handleBlur={handleBlur}
                //errors={errors.nombreUsuario}
                //touched={touched.nombreUsuario}
              />

              <FormControl
                label="Nombre usuario"
                value={values.nombreUsuario}
                name="nombreUsuario"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.nombreUsuario}
                touched={touched.nombreUsuario}
              />
  
              <FormControl
                label="Email"
                value={values.email}
                name="email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.email}
                touched={touched.email}
              />
                <FormControl
                label="CUIT"
                value={values.cuit}
                name="cuit"
                handleChange={handleChange}
                handleBlur={handleBlur}
                //errors={errors.email}
                //touched={touched.email}
              />

                <FormControl
                textarea
                label="Descripción"
                value={values.description}
                name="descripcion"
                handleChange={handleChange}
                handleBlur={handleBlur}
                //errors={errors.}
                //touched={touched.email}
              />







              <View style={styles.buttonContainer}>
                <Button
                  backgroundColor={Colors.locro}
                  color={Colors.mJordan}
                  onPress={handleSubmit}
                >
                  Guardar cambios
                </Button>
              </View>
              <View style={styles.bottomText}></View>
            </Form>
          )}
        </Formik>
        </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },

  buttonContainer: {
    marginTop: 12,
    paddingBottom: 140,
  },

  combobox: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    flex: 1,
  },

  bottomText: {
    paddingBottom: 140,
  },
});