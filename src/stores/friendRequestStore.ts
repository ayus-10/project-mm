import { create } from "zustand";
import { IFriend } from "@/interfaces/IFriend";

interface FriendRequestStore {
  sentRequests: IFriend[] | undefined;
  receivedRequests: IFriend[] | undefined;
  setSentRequests: (requests: IFriend[] | undefined) => void;
  setReceivedRequests: (requests: IFriend[] | undefined) => void;
}

export const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  sentRequests: undefined,
  receivedRequests: undefined,
  setSentRequests: (requests) => set({ sentRequests: requests }),
  setReceivedRequests: (requests) => set({ receivedRequests: requests }),
}));
