import { useEffect, useState } from "react";

import { ChatNavigation } from "@/components/chat/navigation/ChatNavigation";
import { ChatBody } from "@/components/chat/body/ChatBody";

import { IConversation } from "@/interfaces/IConversation";
import { IFriend } from "@/interfaces/IFriend";

import { customGet } from "@/utils/customAxios";
import { useFriendRequestStore } from "@/stores/friendRequestStore";
import { useFriendsAndConversationsStore } from "@/stores/friendsAndConversationsStore";

interface FriendRequests {
  sent: IFriend[];
  received: IFriend[];
}

interface GetConversationsResponse {
  conversations: IConversation[];
}

interface GetFriendsResponse {
  friends: IFriend[];
}

export function Chat() {
  const [fetchCount, setFetchCount] = useState(0);

  const { setSentRequests, setReceivedRequests, setLoadingRequests } =
    useFriendRequestStore();

  const { setFriends, setLoadingFNC, setConversations } =
    useFriendsAndConversationsStore();

  useEffect(() => {
    const eventSource = new EventSource("/api/events");
    eventSource.onmessage = () => setFetchCount((c) => c + 1);
    eventSource.onerror = () => eventSource.close();

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    async function getRequests(showLoading: boolean) {
      if (showLoading) setLoadingRequests(true);

      const res = await customGet<FriendRequests>("/api/friends/requests");

      if (res) {
        setSentRequests(res.sent);
        setReceivedRequests(res.received);
      }

      if (showLoading) setLoadingRequests(false);
    }

    getRequests(fetchCount === 0);
  }, [fetchCount, setSentRequests, setReceivedRequests, setLoadingRequests]);

  useEffect(() => {
    async function getConversations() {
      const res = await customGet<GetConversationsResponse>(
        "/api/chat/conversations",
      );

      if (res) setConversations(res.conversations);
    }

    async function getFriends() {
      const res = await customGet<GetFriendsResponse>("/api/friends");

      if (res) setFriends(res.friends);
    }

    async function getFNC() {
      setLoadingFNC(true);
      await Promise.all([getConversations(), getFriends()]);
      setLoadingFNC(false);
    }

    getFNC();
  }, [setLoadingFNC, setConversations, setFriends]);

  return (
    <div className="flex h-dvh w-screen select-none overflow-hidden bg-white text-gray-850 dark:bg-gray-800 dark:text-white">
      <ChatNavigation />
      <ChatBody />
    </div>
  );
}
