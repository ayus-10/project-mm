import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

export default function useRedirect() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const { email, fullName } = useAppSelector(
    (state) => state.authenticatedUserSlice,
  );

  useEffect(() => {
    const isLoggedIn = email && fullName;

    const isNonProtectedPath =
      pathname === "/login" || pathname === "/signup" || pathname === "/";

    if (isNonProtectedPath && isLoggedIn) {
      navigate("/chat");
    }

    if (!isNonProtectedPath && !isLoggedIn) {
      navigate("/");
    }

    if (pathname === "/" && !isLoggedIn) {
      navigate("/login");
    }
  }, [pathname, email, fullName]);
}
