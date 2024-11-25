import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "comercios/";

  export async function dataDashboard(token, time) {
    const requestUrl = url + "get-dashboard/";
    const formdata = new FormData();
    formdata.append("filter_time", time);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    };
  
    try {
      const data = await httpRequest(requestUrl, requestOptions);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

