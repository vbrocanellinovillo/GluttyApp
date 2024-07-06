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

const sexos = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
  { label: "Otro", value: "OTHER" },
];

export default function ProfileForm({ onSubmit, user }) {
  function submitHandler({
    nombreUsuario,
    nombre,
    apellido,
    sexo,
    fechaNacimiento,
    email,
  }) {
    onSubmit(nombreUsuario, nombre, apellido, sexo, fechaNacimiento, email);
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <FormHeader title="icono futuro" />
        <Formik
          initialValues={{
            nombreUsuario: user.username,
            nombre: user.first_name,
            apellido: user.last_name,
            sexo: user.gender,
            fechaNacimiento: user.dateBirth,
            email: user.email,
          }}
          validate={({
            nombreUsuario,
            nombre,
            apellido,
            sexo,
            fechaNacimiento,
            email,
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
              <FormTitle>Usuario</FormTitle>
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
                label="Nombre"
                value={values.nombre}
                name="nombre"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.nombre}
                touched={touched.nombre}
              />
              <FormControl
                label="Apellido"
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
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
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
