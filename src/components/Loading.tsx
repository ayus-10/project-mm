import { HashLoader } from "react-spinners";
import { useAppSelector } from "../redux/hooks";
import useAuthentication from "../hooks/useAuthentication";

export default function Loading() {
  useAuthentication();
  const { fullName } = useAppSelector((state) => state.authenticatedUserSlice);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <HashLoader color="#a855f7" />
      <h1 className="text-2xl font-bold text-purple-500">
        {fullName === undefined
          ? "Loading, please wait"
          : fullName === null
            ? "Redirecting to Login"
            : `Logged in as ${fullName}`}
      </h1>
    </div>
  );
}
