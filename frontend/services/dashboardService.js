import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "comercios/";

// top 3 branches
export async function dataDashboard(token) {
    //url que nos pasen las chicas jeje
    const requestUrl = url + "";

    const requestOptions = {
        //lo que nos pasen las xikas
        method: "",
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


