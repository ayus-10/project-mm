import Image from "next/image";
import UserProfiles from "@/components/chat/UserProfiles";

export default function ChatMenu() {
  const loggedInUser = {
    username: "The Boss",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/986940340227432450/0a631fa4969b98de989be153d20e689f.webp?size=100",
  };

  return (
    <>
      <div className="grid h-48 place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          <Image
            height={100}
            width={100}
            src={loggedInUser.profilePictureUrl}
            className="rounded-full"
            alt={`Profile picture of ${loggedInUser.username}`}
          ></Image>
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500"></div>
        </div>
        <h1 className="text-xl md:text-2xl md:font-semibold">
          {loggedInUser.username}
        </h1>
        <span className="rounded-lg bg-green-300 px-5 py-1 font-bold text-green-700">
          Active
        </span>
      </div>
      <UserProfiles />
    </>
  );
}
