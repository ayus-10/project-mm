import { create } from "zustand";
import { IUser } from "@/interfaces/IUser";
import { IFriend } from "@/interfaces/IFriend";

interface UserProfileStore {
  search: string;
  setSearch: (value: string) => void;
  profile: IUser | undefined;
  setProfile: (profile: IUser | undefined) => void;
}

interface FriendRequestStore {
  sentRequests: IFriend[] | undefined;
  receivedRequests: IFriend[] | undefined;
  setSentRequests: (requests: IFriend[] | undefined) => void;
  setReceivedRequests: (requests: IFriend[] | undefined) => void;
}

export const useUserProfileStore = create<UserProfileStore>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  profile: undefined,
  setProfile: (profile) => set({ profile }),
}));

export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  sentRequests: undefined,
  receivedRequests: undefined,
  setSentRequests: (requests) => set({ sentRequests: requests }),
  setReceivedRequests: (requests) => set({ receivedRequests: requests }),
}));
