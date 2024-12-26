import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAuthenticatedUser } from "../redux/slices/authenticatedUserSlice";
import refreshTokens from "../requests/refreshTokens";
import axios from "axios";
import { ACCESS_TOKEN } from "../constants";

interface AuthResponse {
  email: string;
  fullName: string;
}

export default function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function authenticateUser() {
      const setStates = (email?: string, fullName?: string) => {
        dispatch(
          setAuthenticatedUser({
            email: email ?? null,
            fullName: fullName ?? null,
          }),
        );
        setIsLoggedIn(
          typeof email === "string" && typeof fullName === "string",
        );
      };

      const fetchAuth = () =>
        axios.get<AuthResponse>("/api/Auth", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        });

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
  }, [dispatch]);

  return isLoggedIn;
}
