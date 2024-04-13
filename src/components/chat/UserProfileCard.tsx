import Image from "next/image";
import { UserProfilesArray } from "./UserProfiles";
import { HiDotsVertical } from "react-icons/hi";
import { Dispatch, SetStateAction } from "react";
import { MdBlock, MdDelete } from "react-icons/md";

type UserProfileCardProps = UserProfilesArray & {
  selectedUserId: string;
  setSelectedUserId: Dispatch<SetStateAction<string>>;
};

export default function UserProfileCard(props: UserProfileCardProps) {
  const {
    id,
    profilePictureUrl,
    username,
    lastMessage,
    sentTime,
    unseenMessagesCount,
    selectedUserId,
    setSelectedUserId,
  } = props;

  return (
    <div className="group my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md dark:hover:bg-gray-850">
      <Image
        priority
        src={profilePictureUrl}
        className="size-[50px] rounded-full"
        height={50}
        width={50}
        alt={`Profile picture of ${username}`}
      ></Image>
      <div className="relative flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            {username}
          </h2>
          <p className="line-clamp-2 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
            {lastMessage}
          </p>
        </div>
        <div
          className={`flex flex-col items-end justify-center gap-2 text-xs group-hover:invisible ${id === selectedUserId && "invisible"}`}
        >
          <span className="text-right text-gray-500 dark:text-gray-400">
            {sentTime}
          </span>
          {unseenMessagesCount > 0 && (
            <div className="grid size-4 place-content-center rounded-full bg-purple-700 text-white">
              {unseenMessagesCount}
            </div>
          )}
        </div>
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 group-hover:block ${id === selectedUserId ? "block" : "hidden"}`}
          onClick={() => setSelectedUserId(id === selectedUserId ? "" : id)}
        >
          <HiDotsVertical className="rounded-full bg-gray-300 p-1 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800" />
        </button>
        {selectedUserId === id && (
          <div className="absolute right-8 top-1/2 flex w-full -translate-y-1/2 flex-col gap-1 rounded-lg border-b-2 border-purple-700 bg-gray-300 py-2 dark:bg-gray-900">
            <button className="flex items-center justify-center gap-1 px-3 duration-200 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
              <MdDelete />
              <span>Delete</span>
            </button>
            <button className="flex items-center justify-center gap-1 px-3 duration-200 ease-in-out hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800">
              <MdBlock />
              <span>Block</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
