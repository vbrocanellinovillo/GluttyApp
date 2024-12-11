import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "usuarios/";
/* 
- POST /usuarios/report/ : me mandan report_type (USER o POST), reported_id (username o id del posteo) 

- POST /usuarios/get-reported-posts/ : me pueden mandar page y page_size para paginación, 
devuelve los posteos con toda la info que se manda en la comunidad por ejemplo get recent posts, 
y se ordenan por cantidad de reportes - también les mando por posteo el report_count que es la cant 
de veces que los reportaron */

export async function report(reportType, reportId, token) {
    const formdata = new FormData();
    formdata.append("report_type", reportType);
    formdata.append("reported_id", reportId);
  
    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const requestUrl = url + "report/";
  
    try {
      const response = await httpRequest(requestUrl, requestOptions);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }