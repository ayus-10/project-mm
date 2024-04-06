import Image from "next/image";
import { IoIosVideocam, IoMdClose } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import ProfileTabs from "./ProfileTabs";
import { CurrentChatData } from "@/app/chat/page";

type ProfileInfoProps = {
  currentChat: CurrentChatData;
  showUserInfo: boolean;
  toggleUserInfoVisibility: () => void;
};

export default function ProfileInfo(props: ProfileInfoProps) {
  const { currentChat, showUserInfo, toggleUserInfoVisibility } = props;

  return (
    <div className="relative">
      <div
        className={`${showUserInfo ? "right-0 md:flex" : "-right-[calc(100vw-4.25rem)] md:hidden"} absolute z-30 flex h-full w-[calc(100vw-4.25rem)] flex-col bg-gray-200 duration-300 ease-in-out dark:bg-gray-800 md:static md:w-[21.9rem]`}
      >
        <div className="flex h-[5.5rem] items-center justify-between px-6">
          <h1 className="text-lg md:text-xl">Profile</h1>
          <IoMdClose
            className="cursor-pointer rounded-lg bg-purple-200 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300 dark:bg-gray-850 dark:hover:bg-gray-900"
            onClick={toggleUserInfoVisibility}
          />
        </div>
        <div className="flex h-[calc(100dvh-5.5rem)] grow flex-col gap-4 px-6">
          <div className="grid h-[12.75rem] place-items-center gap-1 py-2 md:h-[13.25rem]">
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
              <p className="text-xs text-gray-500 dark:text-gray-400 md:text-sm">
                {currentChat.status}
              </p>
            </div>
            <div className="flex justify-between gap-4">
              <IoMail className="cursor-pointer rounded-full bg-green-300 p-2 text-4xl text-green-700 duration-200 ease-in-out hover:bg-green-500 hover:text-white" />
              <MdLocalPhone className="cursor-pointer rounded-full bg-purple-300 p-2 text-4xl text-purple-700 duration-200 ease-in-out hover:bg-purple-500 hover:text-white" />
              <IoIosVideocam className="cursor-pointer rounded-full bg-indigo-300 p-2 text-4xl text-indigo-700 duration-200 ease-in-out hover:bg-indigo-500 hover:text-white" />
            </div>
          </div>
          <ProfileTabs />
        </div>
      </div>
    </div>
  );
}
