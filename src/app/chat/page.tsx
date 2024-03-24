"use client";
import Image from "next/image";
import DemoUser from "../../assets/demouser.webp";
import { IoIosVideocam } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { IoMail, IoSearch, IoSettingsOutline } from "react-icons/io5";
import { HiDotsVertical, HiOutlineEmojiHappy } from "react-icons/hi";
import { IoMicOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { LuChevronLeft, LuMenu } from "react-icons/lu";

export default function Chat() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <main className=" flex h-screen w-screen text-gray-900">
      <section className="flex bg-gray-200">
        <div>
          <nav className="flex h-full flex-col justify-between p-4">
            <LuMenu
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer rounded-full p-2 text-4xl duration-200 ease-in-out hover:bg-gray-300"
            />
            <div className="flex flex-col gap-2">
              <TbMessageDots className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
              <IoSettingsOutline className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
            </div>
            <AiOutlineLogout className="cursor-pointer rounded-full p-2 text-4xl text-red-500 duration-200 ease-in-out hover:bg-gray-300" />
          </nav>
        </div>
        <div className={`grow p-4 ${showMenu ? "block" : "hidden"}`}>
          <div className="flex items-center gap-2">
            <LuChevronLeft className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
            <span className="text-xl">Chat</span>
          </div>
        </div>
      </section>
      <section className="flex grow flex-col">
        <div className="flex h-[5.5rem] w-full items-center justify-between bg-gray-100 px-6 py-4">
          <div>
            <h1 className="text-2xl font-semibold">The Boss</h1>
            <p className="text-gray-500">Active</p>
          </div>
          <div className="flex gap-2 text-4xl text-purple-700">
            <IoIosVideocam className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <MdLocalPhone className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <IoSearch className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200" />
            <HiDotsVertical
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="shrink-0 cursor-pointer rounded-full p-2 duration-200 ease-in-out hover:bg-purple-200"
            />
          </div>
        </div>
        <div className="flex grow flex-col">
          <div className="grow"></div>
          <div className="flex items-center justify-between gap-4 px-4 py-4">
            <div className="relative w-full">
              <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-full bg-indigo-300 bg-opacity-50 p-2 text-2xl text-indigo-700 duration-200 ease-in-out hover:bg-opacity-80">
                <HiOutlineEmojiHappy />
              </div>
              <input
                type="text"
                placeholder="Message..."
                className="z-0 w-full rounded-lg bg-gray-200 px-16 py-3 text-xl shadow-black outline-none duration-200 ease-in-out hover:shadow-md focus:shadow-md"
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
      <section className={showUserInfo ? "block" : "hidden"}>
        <div className="flex h-full flex-col bg-gray-100">
          <h1 className="flex h-[5.5rem] items-center bg-gray-200 px-6 text-2xl">
            Profile
          </h1>
          <div className="grow px-6">
            <div className="grid h-64 place-items-center gap-1">
              <Image
                height={100}
                width={100}
                src={DemoUser}
                className="rounded-full"
                alt="Profile picture"
              ></Image>
              <div className="text-center">
                <h1 className="text-2xl font-semibold">The Boss</h1>
                <h4 className="text-sm text-gray-500">5 minutes ago</h4>
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
