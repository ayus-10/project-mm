import { AiOutlineLogout as LogoutIcon } from "react-icons/ai";
import { PiChatCircleText as MessagesTabIcon } from "react-icons/pi";
import { LuChevronLeft as BackIcon, LuMenu as MenuIcon } from "react-icons/lu";
import { IoSettingsOutline as SettingsTabIcon } from "react-icons/io5";
import { LiaUserFriendsSolid as FriendsTabIcon } from "react-icons/lia";
import { useEffect, useState } from "react";
import MessagesTab from "./tabs/messages/MessagesTab";
import SettingsTab from "./tabs/settings/SettingsTab";
import FriendsTab from "./tabs/friends/FriendsTab";

type ActiveTab = "MESSAGES" | "FRIENDS" | "SETTINGS";

export default function ChatNavigation() {
  const [showNavigation, setShowNavigation] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>("MESSAGES");

  useEffect(() => {
    setShowNavigation(window.innerWidth >= 768);
  }, []);

  function changeActiveTab(tab: ActiveTab) {
    setActiveTab(tab);
    setShowNavigation(true);
  }

  return (
    <div className="relative flex">
      <nav className="relative z-30 flex h-full w-[4.25rem] flex-col justify-between bg-gray-200 p-4 dark:bg-gray-850">
        <MenuIcon
          onClick={() => setShowNavigation((prev) => !prev)}
          className="cursor-pointer rounded-full p-2 text-4xl duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-800"
        />
        <div className="flex flex-col gap-2">
          <MessagesTabIcon
            onClick={() => changeActiveTab("MESSAGES")}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:bg-gray-800 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white"
          />
          <FriendsTabIcon
            onClick={() => changeActiveTab("FRIENDS")}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:bg-gray-800 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white"
          />
          <SettingsTabIcon
            onClick={() => changeActiveTab("SETTINGS")}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:bg-gray-800 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white"
          />
        </div>
        <LogoutIcon className="cursor-pointer rounded-full p-2 text-4xl text-red-500 duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-800" />
      </nav>
      <div
        className={`absolute z-20 h-full grow bg-gray-200 duration-300 ease-in-out dark:bg-gray-850 md:static ${
          showNavigation ? "left-[100%] md:block" : "-left-[100vw] md:hidden"
        }`}
      >
        <div className="flex h-[5.5rem] items-center gap-2 px-2 sm:px-6">
          <BackIcon
            onClick={() => setShowNavigation((prev) => !prev)}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:bg-gray-800 dark:text-purple-500 dark:hover:bg-purple-500 dark:hover:text-white"
          />
          <span className="text-lg capitalize md:text-xl">{activeTab}</span>
        </div>
        <div className="flex h-[calc(100dvh-5.5rem)] w-[calc(100vw-4.25rem)] max-w-[23.75rem] flex-col gap-4 px-2 sm:px-6 md:w-[40vw]">
          {activeTab === "MESSAGES" ? (
            <MessagesTab />
          ) : activeTab === "FRIENDS" ? (
            <FriendsTab />
          ) : (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
}
