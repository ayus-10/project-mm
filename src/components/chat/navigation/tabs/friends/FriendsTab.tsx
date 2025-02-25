import { FormEvent, useEffect, useRef, useState } from "react";
import { customGet } from "@/utils/customAxios";

import { IoSearch as SearchIcon } from "react-icons/io5";
import { MdClose as CloseIcon } from "react-icons/md";
import { PiUserCirclePlusThin as UserProfileIcon } from "react-icons/pi";

import FriendList from "./FriendList";
import FriendCard from "./card/FriendCard";
import { useFriendRequestStore } from "@/stores/friendRequestStore";
import { useUserProfileStore } from "@/stores/userProfileStore";

import { ViewFriendsTab } from "./types";
import { IUser } from "@/interfaces/IUser";

export default function FriendsTab() {
  const tabButtons: ViewFriendsTab[] = ["RECEIVED", "SENT"];

  const [activeTab, setActiveTab] = useState<ViewFriendsTab>("RECEIVED");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const { search, profile, setSearch, setProfile } = useUserProfileStore();

  const { sentRequests, receivedRequests, loadingRequests } =
    useFriendRequestStore();

  const [loadingProfile, setLoadingProfile] = useState(false);

  function searchUserProfile(e: FormEvent) {
    e.preventDefault();

    if (!searchInputRef.current) {
      return;
    }

    if (search) {
      clearSearchStates();
      searchInputRef.current.value = "";
    } else {
      setSearch(searchInputRef.current.value.toLowerCase());
    }
  }

  function clearSearchStates() {
    setErrorMessage("");
    setSearch("");
    setProfile(undefined);
  }

  useEffect(() => {
    async function find() {
      setLoadingProfile(true);

      const res = await customGet<IUser>(`/api/friends/find?email=${search}`);
      if (res) setProfile(res);

      setLoadingProfile(false);
    }

    if (search) find();
  }, [search, setProfile]);

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Find friends</h1>
        <form className="relative mb-2 w-full" onSubmit={searchUserProfile}>
          <input
            ref={searchInputRef}
            onChange={clearSearchStates}
            placeholder="Email..."
            type="text"
            className="w-full rounded-lg bg-white py-2 pl-4 pr-16 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <button className="absolute right-0 top-1/2 flex h-full w-14 -translate-y-1/2 items-center justify-center rounded-lg bg-purple-700 px-2 text-xl text-white duration-200 ease-in-out hover:bg-purple-800">
            {search ? <CloseIcon /> : <SearchIcon />}
          </button>
        </form>
        {profile ? (
          <FriendCard tab="FIND" user={profile} />
        ) : (
          <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 dark:bg-gray-750">
            <UserProfileIcon className="flex-shrink-0 text-5xl text-purple-700 dark:text-white" />
            <h2 className="leading-5 text-purple-700 dark:text-white md:text-lg md:leading-6">
              {loadingProfile
                ? "Searching, please wait..."
                : errorMessage || "Search for friends using email."}
            </h2>
          </div>
        )}
      </div>
      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Friend requests</h1>
        <div className="relative flex justify-between gap-2 rounded-lg bg-purple-200 p-2 dark:bg-gray-750">
          {tabButtons.map((btn) => (
            <button
              key={btn}
              onClick={() => setActiveTab(btn)}
              className={`w-1/2 rounded-lg px-3 py-1 duration-200 ease-in-out ${
                activeTab === btn
                  ? "bg-purple-600 text-white"
                  : "bg-purple-300 text-purple-700"
              }`}
            >
              <span className="relative z-30">{btn}</span>
            </button>
          ))}
        </div>
        <FriendList
          sent={sentRequests}
          received={receivedRequests}
          tab={activeTab}
          isLoading={loadingRequests}
        />
      </div>
    </div>
  );
}
