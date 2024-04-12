import { AiOutlineLogout } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { LuChevronLeft, LuMenu } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import MessagesTab from "./MessagesTab";
import SettingsTab from "./SettingsTab";
import { Dispatch, SetStateAction, useState } from "react";
import { signOut } from "next-auth/react";

type ChatNavigationProps = {
  showNavigation: boolean;
  setShowNavigation: Dispatch<SetStateAction<boolean>>;
  isMobileScreen: boolean;
  setShowProfileInfo: Dispatch<SetStateAction<boolean>>;
};

type ActiveTab = "chat" | "settings";

export default function ChatNavigation(props: ChatNavigationProps) {
  const {
    showNavigation,
    setShowNavigation,
    isMobileScreen,
    setShowProfileInfo,
  } = props;

  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");

  function changeActiveTab(tab: ActiveTab) {
    setActiveTab(tab);
    setShowNavigation(true);
    if (isMobileScreen) {
      setShowProfileInfo(false); // Both navigation and profile info can't be visible at the same time on mobile
    }
  }

  function toggleNavigationVisibility() {
    setShowNavigation(!showNavigation);
    if (isMobileScreen) {
      setShowProfileInfo(false); // Both navigation and profile info can't be visible at the same time on mobile
    }
  }

  return (
    <div className="relative flex">
      <nav className="relative z-30 flex h-full w-[4.25rem] flex-col justify-between bg-gray-200 p-4 dark:bg-gray-800">
        <LuMenu
          onClick={toggleNavigationVisibility}
          className="cursor-pointer rounded-full p-2 text-4xl duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
        />
        <div className="flex flex-col gap-2">
          <TbMessageDots
            onClick={() => changeActiveTab("chat")}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300 dark:bg-gray-850 dark:hover:bg-gray-900"
          />
          <IoSettingsOutline
            onClick={() => changeActiveTab("settings")}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300 dark:bg-gray-850 dark:hover:bg-gray-900"
          />
        </div>
        <AiOutlineLogout
          onClick={() => signOut()}
          className="cursor-pointer rounded-full p-2 text-4xl text-red-500 duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-700"
        />
      </nav>
      <div
        className={`absolute z-20 h-full grow bg-gray-200 duration-300 ease-in-out dark:bg-gray-800 md:static ${showNavigation ? "left-[100%] md:block" : "-left-[100vw] md:hidden"}`}
      >
        <div className="flex h-[5.5rem] items-center gap-2 px-2 sm:px-6">
          <LuChevronLeft
            onClick={toggleNavigationVisibility}
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300 dark:bg-gray-850 dark:hover:bg-gray-900"
          />
          <span className="text-lg capitalize md:text-xl">{activeTab}</span>
        </div>
        <div className="flex h-[calc(100dvh-5.5rem)] w-[calc(100vw-4.25rem)] max-w-[23.75rem] flex-col gap-4 px-2 sm:px-6 md:w-[40vw]">
          {activeTab === "chat" ? <MessagesTab /> : <SettingsTab />}
        </div>
      </div>
    </div>
  );
}