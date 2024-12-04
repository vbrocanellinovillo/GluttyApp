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
  formdata.append("is_commerce", isCommerce);

  formdata.append("username", userData.username);
  formdata.append("email", userData.email);
  formdata.append("password", userData.password);

  formdata.append(
    "image",
    userData.image
      ? {
          uri: userData.image.uri,
          name: userData.image.fileName || "photo",
          type: userData.image.mimeType,
        }
      : null
  );

  if (isCommerce) {
    formdata.append("name", userData.name);
    formdata.append("cuit", userData.cuit);
    formdata.append("description", userData.description);
  } else {
    formdata.append("first_name", userData.firstName);
    formdata.append("last_name", userData.lastName);
    formdata.append("sex", userData.sex);
    formdata.append("date_birth", userData.dateBirth);
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const requestUrl = url + "register/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function update(id, isCommerce, userData, token) {
  const formdata = new FormData();
  formdata.append("username", userData.username);
  formdata.append("email", userData.email);

  formdata.append(
    "image",
    userData.image
      ? {
          uri: userData.image.uri,
          name: userData.image.fileName || "photo",
          type: userData.image.mimeType,
        }
      : null
  );

  if (isCommerce) {
    formdata.append("name", userData.name);
    formdata.append("cuit", userData.cuit);
    formdata.append("description", userData.description);
  } else {
    formdata.append("first_name", userData.firstName);
    formdata.append("last_name", userData.lastName);
    formdata.append("gender", userData.sex);
    formdata.append("dateBirth", userData.dateBirth);
  }

  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestUrl = url + `update/${id}/`;

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function forgotPassword(email) {
  const formdata = new FormData();
  formdata.append("email", email);
  
  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  //VER AXA
  const requestUrl = url + "change-password/";

  try {
    //const response = await httpRequest(requestUrl, requestOptions);
    //return response;
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
  };

  const requestUrl = url + "change-password/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logoutSesion(username, token) {
  const formdata = new FormData();
  formdata.append("username", username);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestUrl = url + "logout/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(token) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const requestUrl = url + `get-user/`;
  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendVerificationMail(username) {
  const formdata = new FormData();
  formdata.append("username", username);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const requestUrl = url + "send-verification-code/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function verifyCode(username, verificationCode) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("code", verificationCode);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const requestUrl = url + "verify-code/";
  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function checkUsername(username) {
  const formdata = new FormData();
  formdata.append("username", username);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const requestUrl = url + "check-username/";
  try {
    const response = await httpRequest(requestUrl, requestOptions);

    if (!response?.available) {
      throw new Error("Ese nombre de usuario ya existe");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
