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
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";

export default function LoginForm({ onSubmit }) {
  function submitHandler({ username, password }) {
    onSubmit(username, password);
  }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <FormHeader/>
        <Formik
          initialValues={{ username: "", password: "" }}
          validate={({ username, password }) => {
            const errors = {};

            if (username.trim() === "") {
              errors.username = "Usuario requerido";
            }

            if (password.trim() === "") {
              errors.password = "Contraseña requerida";
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
                value={values.username}
                name="username"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.username}
                errors={errors.username}
                autoCapitalize="none"
              />
              <FormControl
                label="Contraseña"
                secure
                value={values.password}
                name="password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.password}
                errors={errors.password}
                autoCapitalize="none"
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
