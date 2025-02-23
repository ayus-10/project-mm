import axios from "axios";
import { ACCESS_TOKEN } from "@/constants";

interface AccessTokenResponse {
  accessToken: string;
}

export default async function refreshTokens() {
  const { data } = await axios.post<AccessTokenResponse>("/api/auth/refresh");
  if (data.accessToken) {
    localStorage.setItem(ACCESS_TOKEN, data.accessToken);
  }
}
