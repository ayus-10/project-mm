import UserProfileCard from "./UserProfileCard";
import { IoSearch } from "react-icons/io5";
import allUserProfiles from "../../assets/dummy_profiles.json";
import { useEffect, useState } from "react";

export interface UserProfile {
  id: string;
  username: string;
  profilePictureUrl: string;
  lastMessage: string;
  sentTime: string;
  unseenMessagesCount: number;
}

const ALL = "all";
const NEW = "new";

type ActiveTab = typeof ALL | typeof NEW;

export default function UserProfiles() {
  const [userProfiles, setUserProfiles] =
    useState<UserProfile[]>(allUserProfiles);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<ActiveTab>(ALL);

  useEffect(() => {
    if (search) {
      const filteredUserProfiles = allUserProfiles.filter((profile) =>
        profile.username.toLowerCase().includes(search),
      );
      setUserProfiles(filteredUserProfiles);

      setActiveTab(ALL);
    } else {
      setUserProfiles(allUserProfiles);
    }
  }, [search]);

  useEffect(() => {
    if (activeTab === NEW) {
      const filteredUserProfiles = allUserProfiles.filter(
        (profile) => profile.unseenMessagesCount > 0,
      );
      setUserProfiles(filteredUserProfiles);
    } else {
      setUserProfiles(allUserProfiles);
    }
  }, [activeTab]);

  return (
    <div className="flex h-1 w-full grow flex-col">
      <div className="flex flex-col gap-1 py-1">
        <div className="relative w-full">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search..."
            type="text"
            className="w-full rounded-md bg-white p-2 pr-7 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <IoSearch className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="flex w-full gap-2 py-1">
        <button
          onClick={() => setActiveTab(ALL)}
          className={`cursor-pointer rounded-full bg-purple-300 px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${activeTab === ALL && "bg-purple-700 dark:bg-purple-500"}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab(NEW)}
          className={`cursor-pointer rounded-full bg-purple-300 px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${activeTab === NEW && "bg-purple-700 dark:bg-purple-500"}`}
        >
          New
        </button>
      </div>
      <div className="grow overflow-y-scroll">
        {userProfiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            id={profile.id}
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
