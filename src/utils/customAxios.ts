import axios from "axios";

import { refreshTokens } from "./refreshTokens";

const getAccessToken = () => localStorage.getItem("ACCESS_TOKEN");

export async function customPost<T>(endpoint: string, payload?: unknown) {
  const sendPost = () =>
    axios.post<T>(endpoint, payload ?? null, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

  try {
    return (await sendPost()).data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        await refreshTokens();
        return (await sendPost()).data;
      } catch (retryErr) {
        console.error("Retry failed:", retryErr);
      }
    }
    console.error("Request failed:", err);
  }
}

export async function customPatch<T>(endpoint: string, payload?: unknown) {
  const sendPatch = () =>
    axios.patch<T>(endpoint, payload ?? null, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

  try {
    return (await sendPatch()).data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        await refreshTokens();
        return (await sendPatch()).data;
      } catch (retryErr) {
        console.error("Retry failed:", retryErr);
      }
    }
    console.error("Request failed:", err);
  }
}

export async function customGet<T>(endpoint: string) {
  const sendGet = () =>
    axios.get<T>(endpoint, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

  try {
    return (await sendGet()).data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        await refreshTokens();
        return (await sendGet()).data;
      } catch (retryErr) {
        console.error("Retry failed:", retryErr);
      }
    }
    console.error("Request failed:", err);
  }
}

export async function customDelete<T>(endpoint: string) {
  const sendDelete = () =>
    axios.delete<T>(endpoint, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    });

  try {
    return (await sendDelete()).data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      try {
        await refreshTokens();
        return (await sendDelete()).data;
      } catch (retryErr) {
        console.error("Retry failed:", retryErr);
      }
    }
    console.error("Request failed:", err);
  }
}
