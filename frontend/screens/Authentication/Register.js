import RegisterForm from "../../components/Authentication/RegisterForm";

export default function Register() {
  async function submitHandler(values, isCommerce) {
    console.log("llego hasta el register");
    console.log(isCommerce);
    console.log(values);
  }

  return <RegisterForm onSubmit={submitHandler}/>;
}
