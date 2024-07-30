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
    throw new Error(error.message);
  }
}

export async function register(userData, isCommerce) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("first_name", name);
  formdata.append("last_name", lastName);
  formdata.append("gender", sex);
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
    throw new Error(error.message);
  }
}

export async function update(
  username,
  name,
  lastName,
  sex,
  dateBirth,
  email,
  id
) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("first_name", name);
  formdata.append("last_name", lastName);
  formdata.append("gender", sex);
  formdata.append("dateBirth", dateBirth);
  formdata.append("email", email);

  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
  };

  const requestUrl = url + `update/${id}/`;

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function changePassword(username, currentPassword, newPassword) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("old_password", currentPassword);
  formdata.append("new_password", newPassword);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const requestUrl = url + "change-password/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutSesion(username) {
  const formdata = new FormData();
  formdata.append("username", username);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  const requestUrl = url + "logout/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
