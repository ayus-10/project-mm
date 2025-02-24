import { create } from "zustand";
import { IUser } from "@/interfaces/IUser";

interface UserProfileStore {
  search: string;
  profile: IUser | undefined;
  setSearch: (value: string) => void;
  setProfile: (profile: IUser | undefined) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  search: "",
  profile: undefined,
  setSearch: (value) => set({ search: value }),
  setProfile: (profile) => set({ profile }),
}));
