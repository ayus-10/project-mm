import UserProfileCard from "./UserProfileCard";
import { IoSearch } from "react-icons/io5";
import allUserProfiles from "../../assets/dummy_profiles.json";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";

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
    setSelectedUserId("");

    if (search) {
      const filteredUserProfiles = allUserProfiles.filter((profile) =>
        profile.username.toLowerCase().includes(search),
      );
      setUserProfiles(filteredUserProfiles);

      changeActiveTab(ALL);
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

  const [selectedUserId, setSelectedUserId] = useState("");

  function changeActiveTab(tab: ActiveTab) {
    setActiveTab(tab);
    setSelectedUserId("");
  }

  return (
    <div className="flex h-1 w-full grow flex-col">
      <div className="flex flex-col gap-1 py-1">
        <div className="flex justify-between gap-4">
          <span className="font-semibold md:text-lg">Chats</span>
          <FiPlusCircle className="cursor-pointer rounded-full p-0.5 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-purple-300 dark:text-purple-500 dark:hover:bg-gray-750" />
        </div>
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
          onClick={() => changeActiveTab(ALL)}
          className={`cursor-pointer rounded-full border-2 border-purple-700 px-3 text-sm font-medium duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:border-purple-500 dark:hover:bg-purple-500 ${activeTab === ALL && "bg-purple-700 text-white dark:bg-purple-500"}`}
        >
          All
        </button>
        <button
          onClick={() => changeActiveTab(NEW)}
          className={`cursor-pointer rounded-full border-2 border-purple-700 px-3 text-sm font-medium duration-200 ease-in-out hover:bg-purple-700 hover:text-white dark:border-purple-500 dark:hover:bg-purple-500 ${activeTab === NEW && "bg-purple-700 text-white dark:bg-purple-500"}`}
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
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
          />
        ))}
      </div>
    </div>
  );
}
