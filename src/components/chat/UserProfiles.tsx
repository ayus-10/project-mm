import UserProfileCard from "./UserProfileCard";
import { IoSearch } from "react-icons/io5";
import { TbCirclePlus } from "react-icons/tb";

export default function UserProfiles() {
  return (
    <div className="flex h-[calc(100%-12rem)] w-full grow flex-col">
      <div>
        <div className="flex justify-between gap-4">
          <span className="font-semibold md:text-lg">Chats</span>
          <TbCirclePlus className="cursor-pointer rounded-full p-0.5 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
        </div>
        <div className="relative w-full">
          <input
            placeholder="Search..."
            type="text"
            className="w-full rounded-md px-2 py-1 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md"
          />
          <IoSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="my-2 grow overflow-y-scroll">
        {Array.from({ length: 21 }).map((_, index) => (
          <UserProfileCard key={index} />
        ))}
      </div>
    </div>
  );
}
