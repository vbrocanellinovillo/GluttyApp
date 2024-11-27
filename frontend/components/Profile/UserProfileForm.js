import { ScrollView, StyleSheet } from "react-native";
import Form from "../UI/Forms/Form";
import FormTitle from "../UI/Forms/FormTitle";
import FormControl from "../UI/Controls/FormControl";
import FormGroup from "../UI/Forms/FormGroup";
import Combobox from "../UI/Controls/Combobox";
import DatePicker from "../UI/Controls/DatePicker";
import { Formik } from "formik";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";
import FormButtonsGroup from "../UI/Controls/FormButtonsGroup";

const sexos = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
  { label: "Otro", value: "OTHER" },
];

export default function UserProfileForm({
  onSubmit,
  user,
  celiac,
  handleCancel,
  prev,
  next,
}) {
  function submitHandler(values) {
    onSubmit(values);
  }

  return (
    <DismissKeyboardContainer>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Formik
          initialValues={{
            username: user?.username,
            firstName: celiac?.first_name,
            lastName: celiac?.last_name,
            sex: celiac?.sex,
            dateBirth: celiac?.date_birth,
            email: user?.email,
          }}
          validate={({
            username,
            firstName,
            lastName,
            sex,
            dateBirth,
            email,
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
              errors.sex = "Sexo requerido";
            }

            if (dateBirth === undefined) {
              errors.dateBirth = "Fecha requerida";
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
                value={values.username}
                name="username"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.username}
                touched={touched.username}
              />
              <FormControl
                label="Nombre"
                value={values.firstName}
                name="firstName"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.firstName}
                touched={touched.firstName}
              />
              <FormControl
                label="Apellido"
                value={values.lastName}
                name="lastName"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.lastName}
                touched={touched.lastName}
              />
              <FormGroup>
                <Combobox
                  data={sexos}
                  placeholder="Genero"
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
              />
              <FormButtonsGroup
                prev={prev}
                onPrev={handleCancel}
                next={next}
                onNext={handleSubmit}
              />
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

  combobox: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 10,
    flex: 1,
  },
});
