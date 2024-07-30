import { StyleSheet, View } from "react-native";
import Form from "../UI/Forms/Form";
import FormControl from "../UI/Controls/FormControl";
import FormHeader from "../UI/Forms/FormHeader";
import FormTitle from "../UI/Forms/FormTitle";
import { Colors } from "../../constants/colors";
import Button from "../UI/Controls/Button";
import NavigationText from "../UI/Navigation/NavigationText";
import { Formik } from "formik";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";

export default function LoginForm({ onSubmit }) {
  function submitHandler({ usuario, contraseña }) {
    onSubmit(usuario, contraseña);
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <FormHeader title="GLUTTY" />
        <Formik
          initialValues={{ usuario: "", contraseña: "" }}
          validate={({ usuario, contraseña }) => {
            const errors = {};

            if (usuario.trim() === "") {
              errors.usuario = "Usuario requerido";
            }

            if (contraseña.trim() === "") {
              errors.contraseña = "Contraseña requerida";
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
          }) => (
            <Form>
              <FormTitle color={Colors.mJordan}>Iniciar Sesión</FormTitle>
              <FormControl
                label="Usuario"
                value={values.usuario}
                name="usuario"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.usuario}
                errors={errors.usuario}
                autoCapitalize={false}
              />
              <FormControl
                label="Contraseña"
                secure
                value={values.contraseña}
                name="contraseña"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.contraseña}
                errors={errors.contraseña}
                autoCapitalize={false}
              />
              <View style={styles.buttonContainer}>
                <Button
                  backgroundColor={Colors.locro}
                  color={Colors.mJordan}
                  onPress={handleSubmit}
                >
                  Iniciar Sesión
                </Button>
              </View>
              <NavigationText action={"Registrate"} href={"Register"}>
                ¿Todavía no tenes cuenta?
              </NavigationText>
            </Form>
          )}
        </Formik>
      </View>
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
