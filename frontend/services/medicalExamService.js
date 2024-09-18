import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "estudios/";

export async function sendMedicalPDF(pdf, token) {

    const requestUrl = url + "extract-values-pdf/";
  
    const formdata = new FormData();
    
    formdata.append("pdf", pdf);
    
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

export async function registerMedicalExam(token, date, lab, atTG_IgA, aDGP_IgA, antiendomisio, hemoglobina, hematocrito, ferritina,
    hierro_serico, vitamina_b12, calcio_serico, vitamina_d, alt, ast, colesterol_total, colesterol_hdl, trigliceridos, glucemia
  ) {
    const requestUrl = url + "register/";

    const formdata = new FormData();
    
    formdata.append("date", date);
    formdata.append("lab", lab);
    formdata.append("ATTG_IgA", atTG_IgA);
    formdata.append("ADGP_IgA", aDGP_IgA);
    formdata.append("antiendomisio", antiendomisio);
    formdata.append("hemoglobina", hemoglobina);
    formdata.append("hematocrito", hematocrito);
    formdata.append("ferritina", ferritina);
    formdata.append("hierro_serico", hierro_serico);
    formdata.append("vitamina_b12", vitamina_b12);
    formdata.append("calcio_serico", calcio_serico);
    formdata.append("vitamina_d", vitamina_d);
    formdata.append("alt", alt);
    formdata.append("ast", ast);
    formdata.append("colesterol_total", colesterol_total);
    formdata.append("colesterol_hdl", colesterol_hdl);
    formdata.append("trigliceridos", trigliceridos);
    formdata.append("glucemia", glucemia);

    const requestOptions = {
        method: "POST",
        body: formdata,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    }

    try {
        const response = await httpRequest(requestUrl, requestOptions);
        return response;
      } catch (error) {
        throw new Error(error.message);
      }

}

export async function getMedicalExamsList(token) {
    const requestUrl = url + "get-all-analysis/";
    
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

export async function getMedicalExamById(id, token) {
    const requestUrl = url + "get-analysis/";

    const formdata = new FormData();
    
    formdata.append("id_analysis", id);
    
    const requestOptions = {
        method: "POST",
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

export async function deleteMedicalExam(id, token) {
  const requestUrl = url + "delete-analysis/";
  
  const formdata = new FormData();
  
  formdata.append("analysis_id", id);
  
  const requestOptions = {
    method: "DELETE",
    body: formdata,
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
  try {
    const response = await httpRequest(requestUrl, requestOptions);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}