import { backendUrl } from "../constants/backend";
import { Coordinates } from "../models/Coordinates";
import { httpRequest } from "../utils/http";
import { sleep } from "../utils/utilFunctions";

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

export async function getMapPoints(token) {
  const requestUrl = url + "get-branches/";

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await httpRequest(requestUrl, requestOptions);

    const restaurants = [];

    for (dataPoint of response.branches) {
      const coordinate = new Coordinates(
        dataPoint.latitude,
        dataPoint.longitude
      );

      const id = dataPoint.id;

      const restaurant = { id, coordinate };

      restaurants.push(restaurant);
    }

    return restaurants;
  } catch (error) {
    throw new Error(error.message);
  }
}
