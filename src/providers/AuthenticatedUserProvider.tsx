import { ReactNode, useState } from "react";
import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";
import { AuthenticatedUserContext } from "@/contexts/AuthenticatedUserContext";

export function AuthenticatedUserProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<IAuthenticatedUser>({
    email: undefined,
    fullName: undefined,
  });

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
}
