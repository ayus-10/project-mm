type RequestMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

export default async function fetchMagic<T>(
  apiUrl: string,
  requestMethod: RequestMethod,
  payload?: any,
  authHeaders?: boolean,
) {
  try {
    const accessToken = localStorage.getItem("ACCESS_TOKEN");

    const requestHeaders = {
      "Content-Type": "application/json",
      Authorization: accessToken && authHeaders ? `Bearer ${accessToken}` : "",
    };

    const response = await fetch(apiUrl, {
      method: requestMethod,
      headers: requestHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data: T = await response.json();
      return { response, data };
    } else {
      const error: string = await response.text();
      return { response, error };
    }
  } catch (err) {
    console.error("Unable to send magic request: ", err);
  }
}
