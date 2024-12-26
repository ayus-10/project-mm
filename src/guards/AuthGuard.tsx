import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import useAuthentication from "../hooks/useAuthentication";

export default function AuthGuard({
  children,
}: Readonly<{ children: ReactNode }>) {
  const isLoggedIn = useAuthentication();

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isProtectedPath = pathname.startsWith("/chat");

  useEffect(() => {
    if (isLoggedIn === false && isProtectedPath) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn, isProtectedPath]);

  if (isLoggedIn || !isProtectedPath) return children;

  return <Loading />;
}
