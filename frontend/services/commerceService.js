import { backendUrl } from "../constants/backend";
import { Coordinates } from "../models/Coordinates";
import { httpRequest } from "../utils/http";

const url = backendUrl + "comercios/";

export async function sendPdf(selectedDocuments, token) {
  console.log(selectedDocuments);

  const requestUrl = url + "upload-menu/";

  const formdata = new FormData();

  for (let index = 0; index < selectedDocuments.length; index++) {
    const element = selectedDocuments[index];
    formdata.append("menu", element);
  }

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function addBranch(branch, token) {
  console.log(branch);

  const requestUrl = url + "add-branch/";

  const formdata = new FormData();

  formdata.append("name", branch.name);
  formdata.append("phone", branch.phone);
  formdata.append("optional_phone", branch.optionalPhone);
  formdata.append(
    "separated_kitchen",
    branch.separatedKitchen ? "True" : "False"
  );
  formdata.append("just_takeaway", branch.onlyTakeAway ? "True" : "False");
  formdata.append("address", branch.address);
  formdata.append("latitude", branch.coordinates.latitude);
  formdata.append("longitude", branch.coordinates.longitude);
  // Queda lo de la ubicación y las fotos

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAllMenues(token) {
  const requestUrl = url + "get-all-menues/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deletePdf() {}

export async function getMapPoints(token) {
  const requestUrl = url + "get-branches-address/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    const branches = [];

    for (dataPoint of response.branches) {
      const coordinate = new Coordinates(
        dataPoint.latitude,
        dataPoint.longitude
      );

      const id = dataPoint.id;

      const branch = { id, coordinate };

      branches.push(branch);
    }

    return branches;
  } catch (error) {
    throw new Error(error.message);
  }
}

/* HACER ESTA FUNCIÓN PARA UPDATE DE COMERCIO*/
export async function update(username, name, cuit, description, email, id) {
  const formdata = new FormData();
  formdata.append("username", username);
  formdata.append("name", name);
  formdata.append("cuit", cuit);
  formdata.append("description", description);
  formdata.append("email", email);
  formdata.append("id", id);

  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
  };
  console.log("LPM MADREEE");
  const requestUrl = url + `update/${id}/`;
  try {
    console.log("BOCA LA CONCHA DE TU MADREEE");
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
