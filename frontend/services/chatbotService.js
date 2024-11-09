import { backendUrl } from "../constants/backend";
import { httpRequest } from "../utils/http";

const url = backendUrl + "recetas/";

// ASK CHATBOT
// DEVUELVE LA RESPUESTA JUNTO CON SU ID → PARA DESPUÉS SI UNO LE QUIERE DAR FAVORITO A LA RESPONSE
//"id_response": cohere_message_id, "response": generated_text

export async function enviarConsultaChatbot(prompt, token) {
  const requestUrl = url + "ask-chatbot/";

  const formdata = new FormData();
  formdata.append("prompt", prompt);

  const requestOptions = {
    method: "POST",
    body: formdata,
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

// GUARDAR MENSAJE DEL CHATBOT
export async function saveMessage(id, content, token) {
  const requestUrl = url + "toggle-save-message/";

  const formdata = new FormData();

  formdata.append("id", id);
  formdata.append("content", content);

  const requestOptions = {
    method: "POST",
    body: formdata,
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

// TRAE TODOS LOS MENSAJES FAVORITOS DEL CHATBOT
export async function consultarMensajes(token) {
  const requestUrl = url + "get-all-messages/";

  const requestOptions = {
    method: "GET",
    body: formdata,
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

// CONSULTA ESPECÍFICA DE UN MENSAJE
export async function consultarMensajeEspecifico(id_mensaje, token) {
  const requestUrl = url + "get-message/";

  const formdata = new FormData();
  formdata.append("id", id_mensaje);

  const requestOptions = {
    method: "POST",
    body: formdata,
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
