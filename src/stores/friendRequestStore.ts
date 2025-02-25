import { create } from "zustand";
import { IFriend } from "@/interfaces/IFriend";

interface FriendRequestStore {
  sentRequests: IFriend[] | undefined;
  receivedRequests: IFriend[] | undefined;
  loadingRequests: boolean;
  setSentRequests: (requests: IFriend[] | undefined) => void;
  setReceivedRequests: (requests: IFriend[] | undefined) => void;
  setLoadingRequests: (value: boolean) => void;
}

export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  sentRequests: undefined,
  receivedRequests: undefined,
  loadingRequests: false,
  setSentRequests: (requests) => set({ sentRequests: requests }),
  setReceivedRequests: (requests) => set({ receivedRequests: requests }),
  setLoadingRequests: (value) => set({ loadingRequests: value }),
}));
