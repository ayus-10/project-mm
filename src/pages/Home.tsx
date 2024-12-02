import { HashLoader } from "react-spinners";
import useAuthentication from "../hooks/useAuthentication";
import { useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";

export default function Home() {
  const { email, fullName } = useAppSelector(
    (state) => state.authenticatedUserSlice,
  );

  useAuthentication();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (typeof email === "string" && typeof fullName === "string") {
      setIsLoggedIn(true);
    }
    if (email === null && fullName === null) {
      setIsLoggedIn(false);
    }
  }, [email, fullName]);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <HashLoader color="#a855f7" />
      <h1 className="text-2xl font-bold text-purple-500">
        {isLoggedIn === undefined
          ? "Loading, please wait"
          : isLoggedIn
            ? `Logged in as ${fullName}`
            : "Redirecting to Login"}
      </h1>
    </div>
  );
}
