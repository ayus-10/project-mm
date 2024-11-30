import { MdDelete } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import allUserProfiles from "../../assets/dummy_profiles.json";
import { useEffect, useState } from "react";
import DefaultProfilePicture from "./DefaultProfilePicture";

export interface UserProfile {
  id: string;
  username: string;
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
          className={`cursor-pointer rounded-full px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${activeTab === ALL ? "bg-purple-700 dark:bg-purple-500" : "bg-purple-300"}`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab(NEW)}
          className={`cursor-pointer rounded-full px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${activeTab === NEW ? "bg-purple-700 dark:bg-purple-500" : "bg-purple-300"}`}
        >
          New
        </button>
      </div>
      <div className="grow overflow-y-scroll">
        {userProfiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            id={profile.id}
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

function UserProfileCard(props: UserProfile) {
  const { username, lastMessage, sentTime, unseenMessagesCount } = props;

  function trim(str: string) {
    return str.split(" ").join("");
  }

  return (
    <div className="group my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md dark:hover:bg-gray-750">
      <DefaultProfilePicture />
      <div className="relative flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            {username}
          </h2>
          <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
            {lastMessage}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs group-hover:invisible">
          <span className="text-right text-gray-500 dark:text-gray-400">
            {trim(sentTime)}
          </span>
          {unseenMessagesCount > 0 ? (
            <div className="grid size-4 flex-shrink-0 place-content-center rounded-full bg-purple-700 text-white dark:bg-purple-500">
              {unseenMessagesCount}
            </div>
          ) : null}
        </div>
        <div className="hidden place-content-center group-hover:block">
          <div className="size-8 flex-shrink-0 rounded-full bg-red-500 p-2 text-white duration-200 ease-in-out hover:bg-red-600 dark:border-gray-700">
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
}
