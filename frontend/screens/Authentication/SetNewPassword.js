import { useEffect, useRef, useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { forgotPasswordCode } from "../../services/userService"; // Asegúrate de que la función correcta está importada
import LoadingGlutty from "../../components/UI/Loading/LoadingGlutty";
import { Colors } from "../../constants/colors"; // Asegúrate de que Colors tenga los valores que deseas
import DismissKeyboardContainer from "../../components/UI/Forms/DismissKeyboadContainer";
import { Formik } from "formik";
import Button from "../../components/UI/Controls/Button";
import Form from "../../components/UI/Forms/Form";
import FormControl from "../../components/UI/Controls/FormControl";


export default function SetNewPasswordForm({ onSubmit }) {
    function submitHandler({ newPassword, repeatPassword }) {
        onSubmit(newPassword, repeatPassword);
        
        navigation.navigate('Login'); 
      }

  return (
    <DismissKeyboardContainer>
      <View style={styles.container}>
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
              errors.newPassword = "Contraseña invalida";

              if (newPassword.trim().length < 8) {
                errors.newPassword += "\n *Al menos 8 caracteres";
              }

              const minRegex = /(?=.*[a-z])/;
              if (!minRegex.test(newPassword)) {
                errors.newPassword += "\n *Una minuscula";
              }

              const mayusRegex = /(?=.*[A-Z])/;
              if (!mayusRegex.test(newPassword)) {
                errors.newPassword += "\n *Una mayuscula";
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
    paddingTop: 300,
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 20,
  },
});
