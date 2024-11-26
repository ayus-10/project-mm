import Image from "next/image";
import { UserProfile } from "./UserProfiles";
import { MdDelete } from "react-icons/md";

export default function UserProfileCard(props: UserProfile) {
  const {
    profilePictureUrl,
    username,
    lastMessage,
    sentTime,
    unseenMessagesCount,
  } = props;

  function truncate(str: string) {
    return str.split(" ").join("");
  }

  return (
    <div className="group my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md dark:hover:bg-gray-750">
      <Image
        priority
        src={profilePictureUrl}
        className="size-[50px] rounded-full"
        height={50}
        width={50}
        alt={`Profile picture of ${username}`}
      />
      <div className="relative flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            {username}
          </h2>
          <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
            {lastMessage}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs group-hover:invisible">
          <span className="text-right text-gray-500 dark:text-gray-400">
            {truncate(sentTime)}
          </span>
          {unseenMessagesCount > 0 && (
            <div className="grid size-4 flex-shrink-0 place-content-center rounded-full bg-purple-700 text-white dark:bg-purple-500">
              {unseenMessagesCount}
            </div>
          )}
        </div>
        <div className="hidden place-content-center group-hover:block">
          <div className="size-8 flex-shrink-0 rounded-full bg-red-500 p-2 text-white duration-200 ease-in-out hover:bg-red-600 dark:border-gray-700">
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
