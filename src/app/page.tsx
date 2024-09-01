"use client";

import { useState } from "react";
import { HashLoader } from "react-spinners";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined);

  // TODO: redirect to '/chat' or '/login' accordingly

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <HashLoader color="#a855f7" />
      <h1 className="text-2xl font-bold text-purple-500">
        {loggedIn === undefined
          ? "Loading, please wait"
          : loggedIn
            ? "Logged in as USERNAME"
            : "Redirecting to Login"}
      </h1>
    </div>
  );
}
