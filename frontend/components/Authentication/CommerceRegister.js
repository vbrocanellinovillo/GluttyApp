import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import FormControl from "../UI/Controls/FormControl";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";
import NavigationText from "../UI/Navigation/NavigationText";

export default function CommerceRegister({ onSubmit }) {
  function submitHandler(values) {
    onSubmit(values, true);
  }

  return (
    <Formik
      initialValues={{
        username: "",
        name: "",
        cuit: "",
        email: "",
        password: "",
        repeatPassword: "",
        description: "",
      }}
      validate={({
        username,
        name,
        cuit,
        email,
        password,
        repeatPassword,
        description,
      }) => {
        const errors = {};
        if (username.trim() === "") {
          errors.username = "Nombre de usuario requerido";
        }

        if (name.trim() === "") {
          errors.name = "Nombre requerido";
        }

        if (cuit.trim() === "") {
          errors.cuit = "CUIT requerido";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = "Email invalido";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(password)) {
          errors.password = "Error, la contraseña debe tener:";

          if (password.trim().length < 8) {
            errors.password += "\n *Al menos 8 caracteres";
          }

          const minRegex = /(?=.*[a-z])/;
          if (!minRegex.test(password)) {
            errors.password += "\n *Una minuscula";
          }

          const mayusRegex = /(?=.*[A-Z])/;
          if (!mayusRegex.test(password)) {
            errors.password += "\n *Una mayuscula";
          }

          const specialCharRegex = /(?=.*[\W_])/;
          if (!specialCharRegex.test(password)) {
            errors.password += "\n *Un caracter especial";
          }
        }

        if (repeatPassword !== password) {
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
        <>
          <FormControl
            label="Nombre de usuario"
            value={values.username}
            name="username"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.username}
            touched={touched.username}
            autoCapitalize="none"
          />
          <FormControl
            label="Nombre"
            value={values.name}
            name="name"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.name}
            touched={touched.name}
            autoCapitalize="sentences"
          />
          <FormControl
            label="CUIT"
            value={values.cuit}
            name="cuit"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.cuit}
            touched={touched.cuit}
            keyboardType="numeric"
          />
          <FormControl
            label="Email"
            value={values.email}
            name="email"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.email}
            touched={touched.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormControl
            label="Contraseña"
            secure
            value={values.password}
            name="password"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
            autoCapitalize="none"
          />
          <FormControl
            label="Repetir contraseña"
            secure
            value={values.repeatPassword}
            name="repeatPassword"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.repeatPassword}
            touched={touched.repeatPassword}
            autoCapitalize="none"
          />
          <FormControl
            label="Descripción (opcional / maximo 50 )"
            value={values.description}
            name="description"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.description}
            touched={touched.description}
            textarea={true}
            autoCapitalize="sentences"
            maxLength={50}
          />
          <View style={styles.buttonContainer}>
            <Button
              backgroundColor={Colors.locro}
              color={Colors.mJordan}
              onPress={handleSubmit}
            >
              Registrate
            </Button>
          </View>
          <View style={styles.bottomText}>
            <NavigationText action="Iniciar Sesión" href="Login">
              ¿Ya tenes cuenta?
            </NavigationText>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 12,
  },

  bottomText: {
    paddingBottom: 170,
  },
});
