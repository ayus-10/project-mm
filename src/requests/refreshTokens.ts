import { ACCESS_TOKEN, POST } from "../constants";
import fetchMagic from "./fetchMagic";

interface AccessTokenInterface {
  accessToken: string;
}

export default async function refreshTokens() {
  const res = await fetchMagic<AccessTokenInterface>("/api/Auth/refresh", POST);
  if (res?.data?.accessToken) {
    localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
  }
}
