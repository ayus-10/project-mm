import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setAuthenticatedUser } from "../redux/slices/authenticatedUserSlice";
import fetchMagic from "../requests/fetchMagic";
import refreshTokens from "../requests/refreshTokens";

interface AuthResponse {
  email: string;
  fullName: string;
}

export default function useAuthentication() {
  // TODO: redirect to '/chat' or '/login' accordingly

  const dispatch = useAppDispatch();

  const setStates = (email: string | undefined, fullName: string | undefined) =>
    dispatch(
      setAuthenticatedUser({
        email: email ?? null,
        fullName: fullName ?? null,
      }),
    );

  const fetchAuth = () =>
    fetchMagic<AuthResponse>("/api/Auth", "GET", undefined, true);

  useEffect(() => {
    async function authenticateUser() {
      try {
        const res = await fetchAuth();
        if (!res) return;
        if (res.data) {
          setStates(res.data.email, res.data.fullName);
        }
        if (res.error) {
          await refreshTokens();

          const newRes = await fetchAuth();
          if (!newRes) return;
          setStates(newRes.data?.email, newRes.data?.fullName);
        }
      } catch (error) {
        console.error("Unable to authenticate: ", error);
      }
    }

    authenticateUser();
  }, []);
}
