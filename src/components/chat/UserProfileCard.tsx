import Image from "next/image";
import { UserProfilesJson } from "./UserProfiles";

export default function UserProfileCard(props: UserProfilesJson) {
  const {
    profilePictureUrl,
    username,
    lastMessage,
    sentTime,
    unseenMessagesCount,
  } = props;

  return (
    <div className="my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md">
      <Image
        src={profilePictureUrl}
        className="size-[50px] rounded-full"
        height={50}
        width={50}
        alt={`Profile picture of ${username}`}
      ></Image>
      <div className="flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            {username}
          </h2>
          <p className="line-clamp-2 text-xs text-gray-600 md:text-sm">
            {lastMessage}
          </p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2 text-xs">
          <span className="text-right text-gray-500">{sentTime}</span>
          {unseenMessagesCount > 0 && (
            <div className="grid size-4 place-content-center rounded-full bg-purple-700 text-white">
              {unseenMessagesCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
