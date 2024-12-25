import { ACCESS_TOKEN, POST } from "../constants";
import fetchMagic from "./fetchMagic";

interface AccessTokenResponse {
  accessToken: string;
}

export default async function refreshTokens() {
  const res = await fetchMagic<AccessTokenResponse>("/api/Auth/refresh", POST);
  if (res?.data?.accessToken) {
    localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
  }
}
