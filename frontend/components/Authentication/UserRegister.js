import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import FormControl from "../UI/Controls/FormControl";
import FormGroup from "../UI/Forms/FormGroup";
import Combobox from "../UI/Controls/Combobox";
import DatePicker from "../UI/Controls/DatePicker";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";
import NavigationText from "../UI/Navigation/NavigationText";
import { formatDateToYYYYMMDD } from "../../utils/dateFunctions";

const sexes = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
  { label: "Otro", value: "OTHER" },
];

export default function UserRegister({ onSubmit }) {
  function submitHandler(values) {
    onSubmit(values, false);
  }

  return (
    <Formik
      initialValues={{
        username: "",
        firstName: "",
        lastName: "",
        sex: "",
        dateBirth: undefined,
        email: "",
        password: "",
        repeatPassword: "",
      }}
      validate={({
        username,
        firstName,
        lastName,
        sex,
        dateBirth,
        email,
        password,
        repeatPassword,
      }) => {
        const errors = {};
        if (username.trim() === "") {
          errors.username = "Nombre de usuario requerido";
        }

        if (firstName.trim() === "") {
          errors.firstName = "Nombre requerido";
        }

        if (lastName.trim() === "") {
          errors.lastName = "Apellido requerido";
        }

        if (sex.trim() === "") {
          errors.sex = "Genero requerido";
        }

        if (dateBirth === undefined) {
          errors.dateBirth = "Fecha requerida";
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
        setFieldValue,
      }) => (
        <>
          <FormControl
            label="Nombre usuario"
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
            value={values.firstName}
            name="firstName"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.firstName}
            touched={touched.firstName}
            autoCapitalize="words"
          />
          <FormControl
            label="Apellido"
            value={values.lastName}
            name="lastName"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.lastName}
            touched={touched.lastName}
            autoCapitalize="words"
          />
          <FormGroup>
            <Combobox
              data={sexes}
              placeholder="Sexo"
              onChange={(item) => setFieldValue("sex", item)}
              value={values.sex}
              touched={touched.sex}
              errors={errors.sex}
              name="sex"
              handleBlur={handleBlur}
            />
            <DatePicker
              placeholder="Fecha nacimiento"
              onChange={(date) => setFieldValue("dateBirth", date)}
              touched={touched.dateBirth}
              errors={errors.dateBirth}
              value={values.dateBirth}
            />
          </FormGroup>
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
