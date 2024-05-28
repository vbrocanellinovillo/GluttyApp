export async function httpRequest(url, requestOptions) {
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error");
  }
}
