import { createContext, Dispatch, SetStateAction } from "react";
import { IAuthenticatedUser } from "@/interfaces/IAuthenticatedUser";

interface AuthenticatedUserContextValue {
  user: IAuthenticatedUser;
  setUser: Dispatch<SetStateAction<IAuthenticatedUser>>;
}

export const AuthenticatedUserContext = createContext<AuthenticatedUserContextValue>({
  user: { email: undefined, fullName: undefined },
  setUser: () => {},
});
