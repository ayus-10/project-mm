import Image from "next/image";
import DemoUser from "../../assets/demouser.webp";
import UserProfiles from "@/components/chat/UserProfiles";

export default function ChatMenu() {
  return (
    <>
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
        <h1 className="text-xl md:text-2xl md:font-semibold">The Batman</h1>
        <span className="rounded-lg bg-green-300 px-5 py-1 font-bold text-green-700">
          Active
        </span>
      </div>
      <UserProfiles />
    </>
  );
}
