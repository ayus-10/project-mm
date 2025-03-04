import { useState } from "react";

import { IoIosVideocam as VideoCallIcon } from "react-icons/io";
import { IoSearch as SearchMessageIcon } from "react-icons/io5";
import { MdLocalPhone as AudioCallIcon } from "react-icons/md";

import { MessagesContainer } from "./MessagesContainer";

export function ChatBody() {
  const currentChat = {
    username: "John Doe",
    email: "johndoe@example.com",
    status: "Active",
  };

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="flex grow flex-col">
      <div className="relative flex h-[5.5rem] w-full items-center justify-between bg-gray-100 px-2 py-4 dark:bg-gray-750 md:px-6">
        <div>
          <div className="flex flex-col md:flex-row md:items-center">
            <h1 className="text-base md:text-xl">{currentChat.username}</h1>
            <span className="hidden px-1 text-3xl text-neutral-400 dark:text-neutral-500 md:block">
              &middot;
            </span>
            <h1 className="text-sm md:text-xl">{currentChat.email}</h1>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
            {currentChat.status}
          </p>
        </div>
        <div className="flex text-4xl text-purple-700 dark:text-purple-500 md:gap-2">
          <VideoCallIcon className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800" />
          <AudioCallIcon className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800" />
          <SearchMessageIcon
            onClick={() => setShowSearch(!showSearch)}
            className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200 dark:hover:bg-gray-800"
          />
        </div>
        <input
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          type="text"
          placeholder="Search for message..."
          className={`absolute left-0 top-[100%] w-full border-b-[3px] border-gray-500 bg-white p-2 outline-none duration-200 ease-in-out hover:border-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:hover:border-purple-500 dark:focus:border-purple-500 md:px-3 md:py-2 md:text-lg ${
            showSearch ? "block" : "hidden"
          }`}
        />
      </div>
      <MessagesContainer search={search} />
    </div>
  );
}
