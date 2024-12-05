import { backendUrl } from "../constants/backend";
import { Coordinates } from "../models/Coordinates";
import { httpRequest } from "../utils/http";

const url = backendUrl + "comercios/";

export async function sendPdf(selectedDocuments, token) {
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

export async function deletePdf(token, id) {
  if (id === "") {
    return; // Sale de la función sin hacer nada más
  }

  const requestUrl = url + "delete-menu/";

  const formdata = new FormData();

  formdata.append("id", id);

  const requestOptions = {
    method: "DELETE",
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

export async function getPdfById(id, token) {
  const requestUrl = url + "get-menu/";

  const formdata = new FormData();

  formdata.append("id", id);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // Esto asegura que la respuesta se maneje como un archivo binario (blob)
  };
  try {
    const response = await fetch(requestUrl, requestOptions);

    // Retorna el blob para que lo manejes en el componente
    return response;
  } catch (error) {
    // Manejo de errores más detallado
    throw new Error(
      `Error en la solicitud: ${error.response?.data?.error || error.message}`
    );
  }
}

export async function addBranch(branch, token) {
  const requestUrl = url + "add-branch/";
  console.log("deja de llorar:");
  console.log(branch.schedules);
  const formdata = new FormData();

  formdata.append("name", branch.name);
  formdata.append("phone", branch.phone);
  formdata.append("optional_phone", branch.optionalPhone);
  formdata.append(
    "separated_kitchen",
    branch.separatedKitchen ? "True" : "False"
  );
  formdata.append("schedules", JSON.stringify(branch?.schedules));
  formdata.append("just_takeaway", branch.onlyTakeAway ? "True" : "False");
  formdata.append("address", branch.address);
  formdata.append("latitude", branch.coordinates.latitude);
  formdata.append("longitude", branch.coordinates.longitude);

  if (branch.photos) {
    branch.photos.forEach((photo) => {
      formdata.append("image", {
        uri: photo.uri,
        name: photo.fileName || "photo",
        type: photo.mimeType,
      });
    });
  }
  console.log("Formdata");
  console.log(formdata);
  console.log("FormData Schedules:");
  console.log(formdata.getAll("schedules"));

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

//Actualización en la branch
export async function updateBranch(branch, id, token, id_elim = []) {
  const formdata = new FormData();
  formdata.append("name", branch.name);
  formdata.append("phone", branch.phone);
  formdata.append("optional_phone", branch.optional_phone);
  formdata.append("schedules", JSON.stringify(branch?.schedules));
  formdata.append(
    "separated_kitchen",
    branch.separatedKitchen ? "True" : "False"
  );
  formdata.append("just_takeaway", branch.onlyTakeAway ? "True" : "False");
  formdata.append("address", branch.address);
  formdata.append("latitude", branch.latitude);
  formdata.append("longitude", branch.longitude);
  formdata.append("branch_id", id);
  formdata.append("image_ids_to_delete", JSON.stringify(id_elim));
  if (branch.photos) {
    branch.photos.forEach((photo) => {
      formdata.append("image", {
        uri: photo.url || photo.uri,
        name: photo.fileName || "photo",
        type: photo.mimeType,
      });
    });
  }

  const requestOptions = {
    method: "PUT",
    body: formdata,
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const requestUrl = url + `update-branch/`;
  try {
    const response = await httpRequest(requestUrl, requestOptions);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBranch(id, token) {
  const formdata = new FormData();
  formdata.append("branch_id", id);

  const requestOptions = {
    method: "POST",
    body: formdata,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestUrl = url + "get-branch/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getBranches(token) {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const requestUrl = url + "get-branches/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSearchData(
  searchTerm,
  separatedKitchen,
  onlyTakeAway,
  token,
  signal
) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      q: searchTerm,
      separated_kitchen: separatedKitchen,
      just_takeaway: onlyTakeAway,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    signal,
  };

  const requestUrl = url + "search-commerce/";

  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteBranch(id, token) {
  const requestUrl = url + "delete-branch/";

  const formdata = new FormData();

  formdata.append("branch_id", id);

  formdata.append("token", token);

  const requestOptions = {
    method: "DELETE",
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