import RegisterForm from "../../components/Authentication/RegisterForm";

export default function Register() {
  function submitHandler(nombre, apelldio, sexo, fechaNacimiento, email, contraseña) {
  }

  return <RegisterForm onSubmit={submitHandler} />;
}
