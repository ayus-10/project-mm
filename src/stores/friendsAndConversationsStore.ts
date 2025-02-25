import { create } from "zustand";

import { IConversation } from "@/interfaces/IConversation";
import { IFriend } from "@/interfaces/IFriend";

interface FriendsAndConversationsStore {
  conversations: IConversation[];
  friends: IFriend[];
  loadingFNC: boolean;
  setConversations: (c: IConversation[]) => void;
  setFriends: (f: IFriend[]) => void;
  setLoadingFNC: (value: boolean) => void;
}

export const useFriendsAndConversationsStore =
  create<FriendsAndConversationsStore>((set) => ({
    friends: [],
    conversations: [],
    loadingFNC: false,
    setConversations: (c) => set({ conversations: c }),
    setFriends: (f) => set({ friends: f }),
    setLoadingFNC: (value) => set({ loadingFNC: value }),
  }));
