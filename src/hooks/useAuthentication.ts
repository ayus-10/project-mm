import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAuthenticatedUser } from "../redux/slices/authenticatedUserSlice";
import refreshTokens from "../requests/refreshTokens";
import { axiosWithAuth } from "../requests/axiosWithAuth";
import axios from "axios";

interface AuthResponse {
  email: string;
  fullName: string;
}

export default function useAuthentication() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authenticateUser() {
      const setStates = (email?: string, fullName?: string) =>
        dispatch(
          setAuthenticatedUser({
            email: email ?? null,
            fullName: fullName ?? null,
          }),
        );

      const fetchAuth = () => axiosWithAuth.get<AuthResponse>("/api/Auth");

      try {
        const response = await fetchAuth();
        setStates(response.data.email, response.data.fullName);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          try {
            await refreshTokens();
            const newResponse = await fetchAuth();
            setStates(newResponse.data.email, newResponse.data.fullName);
          } catch {
            setStates();
          }
        }
      }
    }

    authenticateUser();
  }, []);
}
