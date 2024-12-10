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

export default function SetNewPasswordForm({ onSubmit }){
    function submitHandler({ newPassword, repeatPassword }) {
        onSubmit({newPassword});
        console.log(newPassword)
    }

    return (
        <DismissKeyboardContainer>
          <View style={styles.container}>
          <Text style={styles.title}>Nueva contraseña</Text>

            <Formik
              initialValues={{
                newPassword: "",
                repeatPassword: "",
              }}
              validate={({ newPassword, repeatPassword }) => {
                const errors = {};
    
                // Validación de la nueva contraseña
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
                if (!passwordRegex.test(newPassword)) {
                  errors.newPassword = "Contraseña inválida";
    
                  if (newPassword.trim().length < 8) {
                    errors.newPassword += "\n *Al menos 8 caracteres";
                  }
    
                  const minRegex = /(?=.*[a-z])/;
                  if (!minRegex.test(newPassword)) {
                    errors.newPassword += "\n *Una minúscula";
                  }
    
                  const mayusRegex = /(?=.*[A-Z])/;
                  if (!mayusRegex.test(newPassword)) {
                    errors.newPassword += "\n *Una mayúscula";
                  }
    
                  const specialCharRegex = /(?=.*[\W_])/;
                  if (!specialCharRegex.test(newPassword)) {
                    errors.newPassword += "\n *Un caracter especial";
                  }
                }
    
                // Validación de que las contraseñas coincidan
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
                      Establecer nueva contraseña
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
      paddingTop: 270,
      alignItems: "center",
    },
  
  
    buttonContainer: {
      marginTop: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.mJordan, 
      },
  });