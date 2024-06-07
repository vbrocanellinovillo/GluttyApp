import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "usuarios/";

export async function login(username, password) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const requestUrl = url + "login/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    console.log("No anda login!!! :(");
    throw new Error();
  }
}

export async function register(
  username,
  name,
  lastName,
  sex,
  dateBirth,
  email,
  password
) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("first_name", name);
  formdata.append("last_name", lastName);
  formdata.append("gender", sex);
  console.log("fecha front: ", dateBirth);
  formdata.append("dateBirth", dateBirth);
  formdata.append("email", email);
  formdata.append("password", password);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const requestUrl = url + "register/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    console.log("No se registró el usuario!!! :(");
    throw new Error();
  }
}
