import UserProfileCard from "./UserProfileCard";
import { IoSearch } from "react-icons/io5";
import { TbCirclePlus } from "react-icons/tb";
import userProfilesJson from "../../assets/dummy_profiles.json";
import { useEffect, useState } from "react";

export type UserProfilesJson = {
  username: string;
  profilePictureUrl: string;
  lastMessage: string;
  sentTime: string;
  unseenMessagesCount: number;
};

type ActiveTab = "all" | "new";

export default function UserProfiles() {
  const [userProfiles, setUserProfiles] =
    useState<UserProfilesJson[]>(userProfilesJson);

  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search) {
      const filteredUserProfiles = userProfilesJson.filter((profile) =>
        profile.username.toLowerCase().includes(search),
      );
      setUserProfiles(filteredUserProfiles);
      setActiveTab("all");
    } else {
      setUserProfiles(userProfilesJson);
    }
  }, [search]);

  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  useEffect(() => {
    if (activeTab === "new") {
      const filteredUserProfiles = userProfilesJson.filter(
        (profile) => profile.unseenMessagesCount > 0,
      );
      setUserProfiles(filteredUserProfiles);
    } else {
      setUserProfiles(userProfilesJson);
    }
  }, [activeTab]);

  return (
    <div className="flex h-[calc(100%-12rem)] w-full grow flex-col">
      <div>
        <div className="flex justify-between gap-4">
          <span className="font-semibold md:text-lg">Chats</span>
          <TbCirclePlus className="cursor-pointer rounded-full p-0.5 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300" />
        </div>
        <div className="relative w-full">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search..."
            type="text"
            className="w-full rounded-md px-2 py-1 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md"
          />
          <IoSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="flex w-full gap-2 px-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`cursor-pointer font-medium duration-200 ease-in-out  hover:text-purple-700 ${activeTab === "all" && "text-purple-700"}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab("new")}
          className={`cursor-pointer font-medium duration-200 ease-in-out hover:text-purple-700  ${activeTab === "new" && "text-purple-700"}`}
        >
          New
        </button>
      </div>
      <div className="grow overflow-y-scroll">
        {userProfiles.map((profile, index) => (
          <UserProfileCard
            key={index}
            profilePictureUrl={profile.profilePictureUrl}
            username={profile.username}
            lastMessage={profile.lastMessage}
            sentTime={profile.sentTime}
            unseenMessagesCount={profile.unseenMessagesCount}
          />
        ))}
      </div>
    </div>
  );
}
