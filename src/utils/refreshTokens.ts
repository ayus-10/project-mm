import axios from "axios";

interface AccessTokenResponse {
  accessToken: string;
}

export default async function refreshTokens() {
  const { data } = await axios.post<AccessTokenResponse>("/api/auth/refresh");
  if (data.accessToken) {
    localStorage.setItem("ACCESS_TOKEN", data.accessToken);
  }
}
