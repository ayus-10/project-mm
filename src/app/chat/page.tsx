"use client";
import Image from "next/image";
import DemoUser from "../../assets/demouser.webp";
import { IoIosVideocam, IoMdClose } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { IoMail, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { HiDotsVertical, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMicOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { LuChevronLeft, LuMenu } from "react-icons/lu";
import { useMobileScreen } from "@/hooks/useMobileScreen";
import UserProfiles from "@/components/chat/UserProfiles";
import Chats from "@/components/chat/Chats";

export default function Chat() {
  const isMobileScreen = useMobileScreen(); // Returns true if screen width < 768px

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(!isMobileScreen);

  // Menu initially hidden on mobile screens
  useEffect(() => setShowMenu(!isMobileScreen), [isMobileScreen]);

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

  return (
    <main className="flex h-dvh w-screen overflow-hidden text-gray-900">
      <section className="relative flex">
        <nav className="relative z-30 flex h-full w-[4.25rem] flex-col justify-between bg-gray-200 p-4">
          <LuMenu
            onClick={toggleMenuVisibility}
            className="cursor-pointer rounded-full p-2 text-4xl duration-200 ease-in-out hover:bg-gray-300"
          />
          <div className="flex flex-col gap-2">
            <TbMessageDots className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
            <IoSettingsOutline className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
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
            <span className="text-lg md:text-xl">Chat</span>
          </div>
          <div className="flex h-[calc(100dvh-5.5rem)] w-[calc(100vw-4.25rem)] max-w-[380px] flex-col gap-4 px-2 sm:px-6 md:w-[40vw]">
            <div className="grid h-48 place-items-center gap-1 py-2">
              <div className="relative h-[100px] w-[100px]">
                <Image
                  height={100}
                  width={100}
                  src={DemoUser}
                  className="rounded-full"
                  alt="My profile picture"
                ></Image>
                <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500"></div>
              </div>
              <h1 className="text-xl md:text-2xl md:font-semibold">
                The Batman
              </h1>
              <span className="rounded-lg bg-green-300 px-5 py-1 font-bold text-green-700">
                Active
              </span>
            </div>
            <UserProfiles />
          </div>
        </div>
      </section>
      <section className="flex grow flex-col">
        <div className="flex h-[5.5rem] w-full items-center justify-between bg-gray-100 px-2 py-4 md:px-6">
          <div>
            <h1 className="text-xl md:text-2xl md:font-semibold">The Boss</h1>
            <p className="text-xs text-gray-500 md:text-sm">Active</p>
          </div>
          <div className="flex text-4xl text-purple-700 md:gap-2">
            <IoIosVideocam className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <MdLocalPhone className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <IoSearch className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <HiDotsVertical
              onClick={toggleUserInfoVisibility}
              className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200"
            />
          </div>
        </div>
        <div className="flex grow flex-col">
          <Chats />
          <div className="flex h-[5.25rem] items-center justify-between gap-4 px-4 py-4">
            <div className="relative w-full">
              <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-indigo-300 bg-opacity-50 p-2 text-2xl text-indigo-700 duration-200 ease-in-out hover:bg-opacity-80">
                <HiOutlineEmojiHappy />
              </div>
              <input
                type="text"
                placeholder="Message..."
                className="z-0 w-full rounded-lg bg-gray-200 px-16 py-3 text-lg shadow-black outline-none duration-200 ease-in-out hover:shadow-md focus:shadow-md md:text-xl"
              />
              <div className="absolute right-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-purple-300 bg-opacity-50 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-opacity-80">
                <RiAttachment2 />
              </div>
            </div>
            <div>
              <IoMicOutline className="h-full w-auto cursor-pointer rounded-full bg-gray-200 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-gray-300" />
            </div>
          </div>
        </div>
      </section>
      <section className="relative">
        <div
          className={`${showUserInfo ? "right-0 md:block" : "-right-[60vw] md:hidden"} absolute z-30 flex h-full max-w-[60vw] flex-col bg-gray-200 md:static`}
        >
          <div className="flex h-[5.5rem] items-center justify-between px-6">
            <h1 className="text-lg md:text-xl">Profile</h1>
            <IoMdClose
              className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
              onClick={toggleUserInfoVisibility}
            />
          </div>
          <div className="grow px-6">
            <div className="grid h-48 place-items-center gap-1 py-2">
              <Image
                height={100}
                width={100}
                src={DemoUser}
                className="rounded-full"
                alt="Profile picture"
              ></Image>
              <div className="text-center">
                <h1 className="text-xl md:text-2xl md:font-semibold">
                  The Boss
                </h1>
                <h4 className="text-xs text-gray-500 md:text-sm">Active</h4>
              </div>
              <div className="flex justify-between gap-4">
                <IoMail className="cursor-pointer rounded-full bg-green-200 bg-opacity-50 p-2 text-4xl text-green-700 duration-200 ease-in-out hover:bg-opacity-100" />
                <MdLocalPhone className="cursor-pointer rounded-full bg-purple-200 bg-opacity-50 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-opacity-100" />
                <IoIosVideocam className="cursor-pointer rounded-full bg-indigo-200 bg-opacity-50 p-2 text-4xl text-indigo-700 duration-200 ease-in-out hover:bg-opacity-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
