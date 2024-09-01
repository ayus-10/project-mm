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
      <div className="grid h-48 place-items-center gap-1 py-2">
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
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500"></div>
        </div>
        <h1 className="text-xl md:text-2xl md:font-semibold">
          {currentUserData.username}
        </h1>
        <span className="rounded-lg bg-green-300 px-5 py-1 font-bold text-green-700">
          Active
        </span>
      </div>
      <UserProfiles />
    </>
  );
}
