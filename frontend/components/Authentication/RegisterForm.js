import { ScrollView, StyleSheet, View } from "react-native";
import Form from "../UI/Form";
import FormHeader from "../UI/FormHeader";
import FormTitle from "../UI/FormTitle";
import FormControl from "../UI/FormControl";
import FormGroup from "../UI/FormGroup";
import Button from "../UI/Button";
import { Colors } from "../../constants/colors";
import NavigationText from "../UI/NavigationText";
import Combobox from "../UI/Combobox";
import DatePicker from "../UI/DatePicker";
import { Formik } from "formik";

const sexos = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
  { label: "Otro", value: "OTHER" },
];

export default function RegisterForm({ onSubmit }) {
  function submitHandler({
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email,
    contraseña,
  }) {
    onSubmit(
      nombreUsuario,
      nombre,
      apellido,
      sexo,
      fechaNacimiento,
      email,
      contraseña
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center" }}
    >
      <FormHeader title="GLUTTY" />
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
            errors.contraseña = "Contraseña invalida";
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
            <FormTitle>Registrate</FormTitle>
            <FormControl
              placeholder="Nombre usuario"
              value={values.nombreUsuario}
              name="nombreUsuario"
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.nombreUsuario}
              touched={touched.nombreUsuario}
            />
            <FormControl
              placeholder="Nombre"
              value={values.nombre}
              name="nombre"
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.nombre}
              touched={touched.nombre}
            />
            <FormControl
              placeholder="Apellido"
              value={values.apellido}
              name="apellido"
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.apellido}
              touched={touched.apellido}
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
                placeholder="dd/mm/aaaa"
                onChange={(date) => setFieldValue("fechaNacimiento", date)}
                touched={touched.fechaNacimiento}
                errors={errors.fechaNacimiento}
                value={values.fechaNacimiento}
              />
            </FormGroup>
            <FormControl
              placeholder="Email"
              value={values.email}
              name="email"
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />
            <FormControl
              placeholder="Contraseña"
              secure
              value={values.contraseña}
              name="contraseña"
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors.contraseña}
              touched={touched.contraseña}
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
          </Form>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
  },

  buttonContainer: {
    marginTop: 12,
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
    paddingBottom: 140
  }
});
