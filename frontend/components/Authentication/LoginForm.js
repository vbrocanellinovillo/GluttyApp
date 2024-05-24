import { StyleSheet, Text, View } from "react-native";
import Form from "../UI/Form";
import FormControl from "../UI/FormControl";
import FormHeader from "../UI/FormHeader";
import FormTitle from "../UI/FormTitle";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import NavigationText from "../UI/NavigationText";

export default function LoginForm() {
  return (
    <View style={styles.container}>
      <FormHeader title={"GLUTTY"} />
      <Form>
        <FormTitle color={Colors.mJordan}>Iniciar Sesión</FormTitle>
        <FormControl placeholder={"Usuario"} />
        <FormControl placeholder={"Contraseña"} secure/>
        <View style={styles.buttonContainer}>
          <Button backgroundColor={Colors.locro} color={Colors.mJordan}>
            Iniciar Sesión
          </Button>
        </View>
        <NavigationText action={"Registrate"} href={"Register"}>
          ¿Todavía no tenes cuenta?
        </NavigationText>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: 40,
  },
});
