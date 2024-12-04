import { Pressable, StyleSheet, View, Text } from "react-native";
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

export default function PasswordForm({ onSubmit }) {
  function submitHandler({ email, emailConfirm }) {
    onSubmit(email, emailConfirm);
  }
  

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <FormHeader/>
        <Formik
          initialValues={{ email: "", emailConfirm:""}}
          validate={({ email, emailConfirm }) => {
            const errors = {};

            if (email.trim() === "") {
              errors.email = "Email requerido";
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
            errors.email = "Email invalido";
            }

            if (emailConfirm !== email) {
                errors.emailConfirm = "Los emails no coinciden";
              }
              console.log(errors)

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
              <FormTitle color={Colors.mJordan}>Ingresa tu email</FormTitle>
              <FormControl
                label="Email"
                value={values.email}
                name="email"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.email}
                errors={errors.email}
                autoCapitalize="none"
              />
              <FormControl
                label="Confirma email"
                value={values.emailConfirm}
                name="emailConfirm"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.emailConfirm}
                errors={errors.emailConfirm}
                autoCapitalize="none"
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
