import { StyleSheet, View } from "react-native";
import Form from "../UI/Forms/Form";
import FormControl from "../UI/Controls/FormControl";
import { Colors } from "../../constants/colors";
import Button from "../UI/Controls/Button";
import { Formik } from "formik";

export default function ChangePasswordForm({ onSubmit }) {
  function submitHandler({ previousPassword, newPassword, repeatPassword }) {
    onSubmit(previousPassword, newPassword, repeatPassword);
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          previousPassword: "",
          newPassword: "",
          repeatPassword: "",
        }}
        validate={({ previousPassword, newPassword, repeatPassword }) => {
          const errors = {};

          if (previousPassword.trim() === "") {
            errors.previousPassword = "Contraseña anterior requerida";
          }

          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
          if (!passwordRegex.test(newPassword)) {
            errors.newPassword = "Contraseña invalida";

            if (newPassword.trim().length < 8) {
              errors.newPassword += "\n *Al menos 8 caracteres";
            }

            const minRegex = /(?=.*[a-z])/;
            if (!minRegex.test(newPassword)) {
              errors.newPassword += "\n *Una minuscula";
            }

            const mayusRegex = /(?=.*[A-Z])/;
            if (!mayusRegex.test(newPassword)) {
              errors.newPassword += "\n *Una mayuscula";
            }

            const specialCharRegex = /(?=.*[\W_])/;
            if (!specialCharRegex.test(newPassword)) {
              errors.newPassword += "\n *Un caracter especial";
            }
          }

          if (newPassword !== repeatPassword) {
            errors.repeatPassword = "Las contraseñas no coinciden";
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
            <FormControl
              label="Ingrese su contraseña actual"
              value={values.previousPassword}
              name="previousPassword"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.previousPassword}
              errors={errors.previousPassword}
              secure
            />
            <FormControl
              label="Ingrese su nueva contraseña"
              secure
              value={values.newPassword}
              name="newPassword"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.newPassword}
              errors={errors.newPassword}
            />
            <FormControl
              label="Repetir contraseña"
              secure
              value={values.repeatPassword}
              name="repeatPassword"
              handleChange={handleChange}
              handleBlur={handleBlur}
              touched={touched.repeatPassword}
              errors={errors.repeatPassword}
            />
            <View style={styles.buttonContainer}>
              <Button
                backgroundColor={Colors.locro}
                color={Colors.mJordan}
                onPress={handleSubmit}
              >
                Cambiar contraseña
              </Button>
            </View>
          </Form>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 20,
  },
});
