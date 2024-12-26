import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Loading from "../components/Loading";
import useAuthentication from "../hooks/useAuthentication";

export default function AuthGuard({
  children,
}: Readonly<{ children: ReactNode }>) {
  useAuthentication();

  const navigate = useNavigate();

  const { email, fullName } = useAppSelector(
    (state) => state.authenticatedUserSlice,
  );

  const isLoggedIn = typeof email === "string" && typeof fullName === "string";

  useEffect(() => {
    if (email === null && fullName === null) navigate("/login");
  }, [navigate, email, fullName]);

  if (isLoggedIn) return children;
  return <Loading />;
}
