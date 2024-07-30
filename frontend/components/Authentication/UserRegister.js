import { StyleSheet, View } from "react-native";
import { Formik } from "formik";
import FormControl from "../UI/Controls/FormControl";
import FormGroup from "../UI/Forms/FormGroup";
import Combobox from "../UI/Controls/Combobox";
import DatePicker from "../UI/Controls/DatePicker";
import Button from "../UI/Controls/Button";
import { Colors } from "../../constants/colors";
import NavigationText from "../UI/Navigation/NavigationText";

const sexos = [
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
        nombreUsuario: "",
        nombre: "",
        apellido: "",
        sexo: "",
        fechaNacimiento: undefined,
        email: "",
        contraseña: "",
      }}
      validate={({
        nombreUsuario,
        nombre,
        apellido,
        sexo,
        fechaNacimiento,
        email,
        contraseña,
      }) => {
        const errors = {};
        if (nombreUsuario.trim() === "") {
          errors.nombreUsuario = "Nombre de usuario requerido";
        }

        if (nombre.trim() === "") {
          errors.nombre = "Nombre requerido";
        }

        if (apellido.trim() === "") {
          errors.apellido = "Apellido requerido";
        }

        if (sexo.trim() === "") {
          errors.sexo = "Genero requerido";
        }

        if (fechaNacimiento === undefined) {
          errors.fechaNacimiento = "Fecha requerida";
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
        setFieldValue,
      }) => (
        <>
          <FormControl
            label="Nombre usuario"
            value={values.nombreUsuario}
            name="nombreUsuario"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.nombreUsuario}
            touched={touched.nombreUsuario}
            autoCapitalize={false}
          />
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
            label="Apellido"
            value={values.apellido}
            name="apellido"
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors.apellido}
            touched={touched.apellido}
            autoCapitalize={true}
          />
          <FormGroup>
            <Combobox
              data={sexos}
              placeholder="Genero"
              onChange={(item) => setFieldValue("sexo", item)}
              value={values.sexo}
              touched={touched.sexo}
              errors={errors.sexo}
              name="sexo"
              handleBlur={handleBlur}
            />
            <DatePicker
              placeholder="Fecha nacimiento"
              onChange={(date) => setFieldValue("fechaNacimiento", date)}
              touched={touched.fechaNacimiento}
              errors={errors.fechaNacimiento}
              value={values.fechaNacimiento}
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
