import { useEffect, useState } from "react";
import { IoSearch as SearchUserIcon } from "react-icons/io5";

import allUserProfiles from "../../../../../../assets/dummy_profiles.json";
import { ActiveTab } from "./types";

import UserProfileCard from "./UserProfileCard";
import TabSwitchButton from "./TabSwitchButton";

export default function UserProfiles() {
  const [userProfiles, setUserProfiles] = useState(allUserProfiles);

  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState<ActiveTab>("ALL");

  useEffect(() => {
    if (search) {
      const filteredUserProfiles = allUserProfiles.filter((profile) =>
        profile.fullName.toLowerCase().includes(search),
      );
      setUserProfiles(filteredUserProfiles);

      setActiveTab("ALL");
    } else {
      setUserProfiles(allUserProfiles);
    }
  }, [search]);

  useEffect(() => {
    if (activeTab === "NEW") {
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
          <SearchUserIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="flex w-full gap-2 py-1">
        <TabSwitchButton
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTab="ALL"
        />
        <TabSwitchButton
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentTab="NEW"
        />
      </div>
      <div className="grow overflow-y-scroll">
        {userProfiles.map((profile) => (
          <UserProfileCard
            key={profile.id}
            id={profile.id}
            fullName={profile.fullName}
            lastMessage={profile.lastMessage}
            sentTime={profile.sentTime}
            unseenMessagesCount={profile.unseenMessagesCount}
          />
        ))}
      </div>
    </div>
  );
}
