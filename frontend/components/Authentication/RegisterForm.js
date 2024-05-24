import { StyleSheet, View } from "react-native";
import Form from "../UI/Form";
import FormHeader from "../UI/FormHeader";
import FormTitle from "../UI/FormTitle";
import FormControl from "../UI/FormControl";
import FormGroup from "../UI/FormGroup";

export default function RegisterForm() {
  return (
    <View style={styles.container}>
      <FormHeader title={"GLUTTY"} />
      <Form>
        <FormTitle>Registrate</FormTitle>
        <FormControl placeholder={"Nombre"} />
        <FormControl placeholder={"Apellido"} />
        <FormGroup>
          <FormControl placeholder={"Sexo"} />
          <FormControl placeholder={"dd/mm/aaaa"} />
        </FormGroup>
        <FormControl placeholder={"Email"} />
        <FormControl placeholder={"Contraseña"} secure />
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },
});
