import Image from "next/image";
import UserProfiles from "./UserProfiles";
import { FaCircleUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";

export default function MessagesTab() {
  const { data: session } = useSession();

  return (
    <>
      <div className="grid h-48 place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          {session?.user?.image ? (
            <Image
              priority
              height={100}
              width={100}
              src={session.user.image}
              className="rounded-full"
              alt={`Profile picture of ${session?.user?.name}`}
            ></Image>
          ) : (
            <FaCircleUser className="text-[100px]" />
          )}
          <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500"></div>
        </div>
        <h1 className="text-xl md:text-2xl md:font-semibold">
          {session?.user?.name}
        </h1>
        <span className="rounded-lg bg-green-300 px-5 py-1 font-bold text-green-700">
          Active
        </span>
      </div>
      <UserProfiles />
    </>
  );
}
