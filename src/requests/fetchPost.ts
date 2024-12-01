export default async function fetchPost<T>(apiUrl: string, payload: any) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    console.error("Unable to send post request: ", err);
  }
}
