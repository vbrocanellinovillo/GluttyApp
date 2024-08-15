import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";


const url = backendUrl + "comercios/";

export async function sendPdf(selectedDocuments, token) {
    console.log(selectedDocuments);

    const requestUrl = url + "upload-menu/";

    const formdata = new FormData();

    for (let index = 0; index < selectedDocuments.length; index++) {
        const element = selectedDocuments[index];
        formdata.append(
            "menu",
            element
        )
    }
         
    

    const requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
            "Content-Type": "multipart/form-data",
             "Authorization": `Bearer ${token}`,
          },
        
    };

    try {
        const response = await httpRequest(requestUrl, requestOptions);
    
        return response;
      } catch (error) {
        throw new Error(error.message);
      }
}