import { useEffect, useState } from "react";

import ChatNavigation from "@/components/chat/navigation/ChatNavigation";
import ChatBody from "@/components/chat/body/ChatBody";

import { customGet } from "@/utils/customAxios";
import { IFriend } from "@/interfaces/IFriend";
import { useFriendRequestStore } from "@/stores/friendRequestStore";

interface FriendRequests {
  sent: IFriend[];
  received: IFriend[];
}

export default function Chat() {
  const [fetchCount, setFetchCount] = useState(0);

  const { setSentRequests, setReceivedRequests, setLoadingRequests } =
    useFriendRequestStore();

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

  return (
    <div className="flex h-dvh w-screen select-none overflow-hidden bg-white text-gray-850 dark:bg-gray-800 dark:text-white">
      <ChatNavigation />
      <ChatBody />
    </div>
  );
}
