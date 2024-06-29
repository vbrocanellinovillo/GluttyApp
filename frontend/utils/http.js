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
    throw new Error(error);
  }
}
