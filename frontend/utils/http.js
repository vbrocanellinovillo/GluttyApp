import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function httpRequest(url, requestOptions) {
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data[Object.keys(data)[0]];
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    const errorMessage = error.message;

    if (
      errorMessage &&
      (typeof errorMessage === "string" || myVar instanceof String) &&
      errorMessage.startsWith("JSON")
    ) {
      throw new Error(
        "Error en la conexión. Por favor intente de nuevo más tarde."
      );
    } else {
      throw new Error(error);
    }
  }
}
