"use client";

import { useSession } from "next-auth/react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <HashLoader color="#a855f7" />
      {status === "loading" ? (
        <h1 className="text-2xl font-bold text-purple-500">
          Loading, please wait
        </h1>
      ) : status === "authenticated" ? (
        <h1 className="text-2xl font-bold text-purple-500">
          Logged in as {session.user?.name}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold text-purple-500">
          Redirecting to Login
        </h1>
      )}
    </div>
  );
}
