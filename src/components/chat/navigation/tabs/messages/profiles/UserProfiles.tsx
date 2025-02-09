import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearch as SearchUserIcon } from "react-icons/io5";

import { ActiveTab } from "./types";
import { IConversation } from "@/interfaces/IConversation";
import { ACCESS_TOKEN } from "@/constants";

import refreshTokens from "@/utils/refreshTokens";
import EmptyImage from "@/assets/alien.png";
import UserProfileCard from "./UserProfileCard";
import Loading from "@/components/Loading";

interface GetConversationsResponse {
  conversations: IConversation[];
}

export default function UserProfiles() {
  const tabs: ActiveTab[] = ["ALL", "NEW"];

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<ActiveTab>("ALL");

  const [conversations, setConversations] = useState<IConversation[]>([]);

  const [loading, setLoading] = useState(false);

  const [filteredConversations, setFilteredConversations] = useState<
    IConversation[]
  >([]);

  const validConversations = filteredConversations.filter(
    ({ message }) => message !== null,
  );

  useEffect(() => {
    const sendRequest = () =>
      axios.get<GetConversationsResponse>("/api/Chat/conversations", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });

    async function getConversations() {
      try {
        setLoading(true);
        const { data } = await sendRequest();
        setConversations(data.conversations);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          await refreshTokens();
          const { data } = await sendRequest();
          setConversations(data.conversations);
        }
      } finally {
        setLoading(false);
      }
    }

    getConversations();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = conversations.filter((conversation) =>
        conversation.receiverName.toLowerCase().includes(search),
      );
      setFilteredConversations(filtered);

      setActiveTab("ALL");
    } else {
      setFilteredConversations(conversations);
    }
  }, [search, conversations]);

  useEffect(() => {
    if (activeTab === "NEW") {
      const filtered = conversations.filter(
        (conversation) => conversation.message?.isSeen,
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [activeTab, conversations]);

  return (
    <div className="flex h-1 w-full grow flex-col">
      <div className="flex flex-col gap-1 py-1">
        <div className="relative w-full">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search..."
            type="text"
            className="w-full rounded-md bg-white p-2 pr-7 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <SearchUserIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="flex w-full gap-2 py-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer rounded-full px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${
              activeTab === tab
                ? "bg-purple-700 dark:bg-purple-500"
                : "bg-purple-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grow overflow-y-auto">
        {validConversations.length > 0 ? (
          validConversations.map((conversation) => (
            <UserProfileCard
              key={conversation.message!.messageTime}
              fullName={conversation.receiverName}
              lastMessage={conversation.message!.lastMessage}
              sentTime={conversation.message!.messageTime}
              hasUnseenMessages={!conversation.message!.isSeen}
            />
          ))
        ) : loading ? (
          <Loading type="SMALL" />
        ) : (
          <div className="flex flex-col items-center gap-2 p-6">
            <img src={EmptyImage} className="size-[150px]" />
            <div className="text-center italic">
              <p>Nothing here!</p>
              <p>Looks like everyone’s taking a nap.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
