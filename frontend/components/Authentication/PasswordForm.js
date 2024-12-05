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
  function submitHandler( values ) {
    console.log("values " + values.username)
    onSubmit(values);
    
  }
  

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
        <FormHeader/>
        <Formik
          initialValues={{ username: "", usernameConfirm:""}}
          validate={({ username, usernameConfirm }) => {
            const errors = {};

            if (username.trim() === "") {
              errors.username = "Username requerido";
            }

            if (username !== usernameConfirm) {
                errors.usernameConfirm = "Los username no coinciden";
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
              <FormTitle color={Colors.mJordan}>Ingresa tu username</FormTitle>
              <FormControl
                label="Username"
                value={values.username}
                name="username"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.username}
                errors={errors.username}
                autoCapitalize="none"
              />
              <FormControl
                label="Confirma username"
                value={values.usernameConfirm}
                name="usernameConfirm"
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched.usernameConfirm}
                errors={errors.usernameConfirm}
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
