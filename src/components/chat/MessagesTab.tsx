import Image from "next/image";
import UserProfiles from "./UserProfiles";
import { FaCircleUser } from "react-icons/fa6";

export default function MessagesTab() {
  const currentUserData = {
    username: "The Boss",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/986940340227432450/91b1bc3903962aa7ee15caebef98c081.webp?size=100",
    status: "Active",
  };

  return (
    <>
      <div className="grid h-32 place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          {currentUserData.profilePictureUrl ? (
            <Image
              priority
              height={100}
              width={100}
              src={currentUserData.profilePictureUrl}
              className="rounded-full"
              alt={`Profile picture of ${currentUserData.username}`}
            />
          ) : (
            <FaCircleUser className="text-[100px]" />
          )}
        </div>
        <h1 className="text-lg md:text-xl md:font-semibold">
          {currentUserData.username}
        </h1>
      </div>
      <UserProfiles />
    </>
  );
}
