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
        nombre: "",
        cuit: "",
        email: "",
        contraseña: "",
        descripcion: "",
      }}
      validate={({ nombre, cuit, email, contraseña, descripcion }) => {
        const errors = {};
        if (nombre.trim() === "") {
          errors.nombre = "Nombre";
        }

        if (cuit.trim() === "") {
          errors.nombre = "CUIT requerido";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = "Email invalido";
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
        if (!passwordRegex.test(contraseña)) {
          errors.contraseña = "Error, la contraseña debe tener:";

          if (contraseña.trim().length < 8) {
            errors.contraseña += "\n *Al menos 8 caracteres";
          }

          const minRegex = /(?=.*[a-z])/;
          if (!minRegex.test(contraseña)) {
            errors.contraseña += "\n *Una minuscula";
          }

          const mayusRegex = /(?=.*[A-Z])/;
          if (!mayusRegex.test(contraseña)) {
            errors.contraseña += "\n *Una mayuscula";
          }

          const specialCharRegex = /(?=.*[\W_])/;
          if (!specialCharRegex.test(contraseña)) {
            errors.contraseña += "\n *Un caracter especial";
          }
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
            label="Nombre"
            value={values.nombre}
            name="nombre"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.nombre}
            touched={touched.nombre}
            autoCapitalize={true}
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
            autoCapitalize={false}
          />
          <FormControl
            label="Contraseña"
            secure
            value={values.contraseña}
            name="contraseña"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.contraseña}
            touched={touched.contraseña}
            autoCapitalize={false}
          />
          <FormControl
            label="Descripción"
            value={values.descripcion}
            name="descripcion"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.descripcion}
            touched={touched.descripcion}
            autoCapitalize={true}
            textarea={true}
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
    paddingBottom: 140,
  },
});
