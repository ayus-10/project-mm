"use client";
import Image from "next/image";
import { IoIosVideocam, IoMdClose } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { IoMail, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { LuChevronLeft, LuMenu } from "react-icons/lu";
import { useMobileScreen } from "@/hooks/useMobileScreen";
import MessageBody from "@/components/chat/MessageBody";
import ChatMenu from "@/components/chat/ChatMenu";
import SettingsMenu from "@/components/chat/SettingsMenu";
import ProfileTabs from "@/components/chat/ProfileTabs";

type ActiveTab = "chat" | "settings";

export default function Chat() {
  const isMobileScreen = useMobileScreen(); // Returns true if screen width < 768px

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(!isMobileScreen);

  // Used for searching message in MessageBody component
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  // Menu initially hidden on mobile screens
  useEffect(() => setShowMenu(!isMobileScreen), [isMobileScreen]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("chat");
  useEffect(() => setShowMenu(true), [activeTab]); // Show Menu when menu tab changes

  function toggleMenuVisibility() {
    setShowMenu(!showMenu);
    if (isMobileScreen) {
      setShowUserInfo(false); // Both User info and Menu can not be visible at same time on mobile screens
    }
  }

  function toggleUserInfoVisibility() {
    setShowUserInfo(!showUserInfo);
    if (isMobileScreen) {
      setShowMenu(false); // Both User info and Menu can not be visible at same time on mobile screens
    }
  }

  const currentChat = {
    username: "John Doe",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/833573797809750066/2f4530153f0d992c760ff2ba115380b5.webp?size=100",
    status: "Active",
  };

  return (
    <main className="flex h-dvh w-screen overflow-hidden text-gray-900">
      <section className="relative flex">
        <nav className="relative z-30 flex h-full w-[4.25rem] flex-col justify-between bg-gray-200 p-4">
          <LuMenu
            onClick={toggleMenuVisibility}
            className="cursor-pointer rounded-full p-2 text-4xl duration-200 ease-in-out hover:bg-gray-300"
          />
          <div className="flex flex-col gap-2">
            <TbMessageDots
              onClick={() => setActiveTab("chat")}
              className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
            />
            <IoSettingsOutline
              onClick={() => setActiveTab("settings")}
              className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
            />
          </div>
          <AiOutlineLogout className="cursor-pointer rounded-full p-2 text-4xl text-red-500 duration-200 ease-in-out hover:bg-gray-300" />
        </nav>
        <div
          className={`absolute z-20 h-full grow bg-gray-200 md:static ${showMenu ? "left-[100%] md:block" : "-left-[100vw] md:hidden"}`}
        >
          <div className="flex h-[5.5rem] items-center gap-2 px-2 sm:px-6">
            <LuChevronLeft
              onClick={toggleMenuVisibility}
              className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
            />
            <span className="text-lg capitalize md:text-xl">{activeTab}</span>
          </div>
          <div className="flex h-[calc(100dvh-5.5rem)] w-[calc(100vw-4.25rem)] max-w-[380px] flex-col gap-4 px-2 sm:px-6 md:w-[40vw]">
            {activeTab === "chat" ? <ChatMenu /> : <SettingsMenu />}
          </div>
        </div>
      </section>
      <section className="flex grow flex-col">
        <div className="relative flex h-[5.5rem] w-full items-center justify-between bg-gray-100 px-2 py-4 md:px-6">
          <div>
            <h1 className="text-xl md:text-2xl md:font-semibold">
              {currentChat.username}
            </h1>
            <p className="text-xs text-gray-500 md:text-sm">
              {currentChat.status}
            </p>
          </div>
          <div className="flex text-4xl text-purple-700 md:gap-2">
            <IoIosVideocam className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <MdLocalPhone className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <IoSearch
              onClick={() => setShowSearch(!showSearch)}
              className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200"
            />
            <HiDotsVertical
              onClick={toggleUserInfoVisibility}
              className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200"
            />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            type="text"
            placeholder="Search for message..."
            className={`absolute left-0 top-[100%] w-full border-b-[3px] border-gray-400 bg-purple-100 p-2 outline-none duration-200 ease-in-out hover:border-purple-700 focus:border-purple-700 md:px-3 md:py-2 md:text-lg ${showSearch ? "block" : "hidden"}`}
          />
        </div>
        <MessageBody search={search} />
      </section>
      <section className="relative">
        <div
          className={`${showUserInfo ? "right-0 md:block" : "-right-[calc(100vw-4.25rem)] md:hidden"} absolute z-30 flex h-full w-[calc(100vw-4.25rem)] flex-col bg-gray-200 md:static md:w-auto`}
        >
          <div className="flex h-[5.5rem] items-center justify-between px-6">
            <h1 className="text-lg md:text-xl">Profile</h1>
            <IoMdClose
              className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
              onClick={toggleUserInfoVisibility}
            />
          </div>
          <div className="flex grow flex-col gap-8 px-6">
            <div className="grid h-48 place-items-center gap-1 py-2">
              <Image
                height={100}
                width={100}
                src={currentChat.profilePictureUrl}
                className="rounded-full"
                alt={`Profile picture of ${currentChat.username}`}
              ></Image>
              <div className="text-center">
                <h1 className="text-xl md:text-2xl md:font-semibold">
                  {currentChat.username}
                </h1>
                <p className="text-xs text-gray-500 md:text-sm">
                  {currentChat.status}
                </p>
              </div>
              <div className="flex justify-between gap-4">
                <IoMail className="cursor-pointer rounded-full bg-green-200 bg-opacity-50 p-2 text-4xl text-green-700 duration-200 ease-in-out hover:bg-opacity-100" />
                <MdLocalPhone className="cursor-pointer rounded-full bg-purple-200 bg-opacity-50 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-opacity-100" />
                <IoIosVideocam className="cursor-pointer rounded-full bg-indigo-200 bg-opacity-50 p-2 text-4xl text-indigo-700 duration-200 ease-in-out hover:bg-opacity-100" />
              </div>
            </div>
            <ProfileTabs />
          </div>
        </div>
      </section>
    </main>
  );
}
