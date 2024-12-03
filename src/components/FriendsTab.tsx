import { FormEvent, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiUserCirclePlusThin } from "react-icons/pi";
import allUserProfiles from "../assets/dummy_profiles.json";
import DefaultProfilePicture from "./DefaultProfilePicture";
import { IoMdAdd } from "react-icons/io";

const SENT = "SENT";
const RECEIVED = "RECEIVED";
const FIND = "FIND";

type ActiveTab = "SENT" | "RECEIVED";
type FriendRequestCardType = "FIND" | "RECEIVED" | "SENT";

export default function FriendsTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(RECEIVED);

  const [search, setSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [profileNotFound, setProfileNotFound] = useState(false);

  const userProfileFound = useMemo(() => {
    const profile = allUserProfiles.find((p) => p.email === search);
    if (!profile && search) {
      setProfileNotFound(true);
    }
    return profile;
  }, [search]);

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
    setProfileNotFound(false);
    setSearch("");
  }

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
            {search ? <MdClose /> : <IoSearch />}
          </button>
        </form>
        {userProfileFound ? (
          <FriendRequestCard tab={FIND} user={userProfileFound} />
        ) : (
          <SearchFriendsResult notFound={profileNotFound} />
        )}
      </div>
      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Friend requests</h1>
        <div className="relative flex justify-between gap-2 rounded-lg bg-purple-200 p-2 dark:bg-gray-750">
          <button
            onClick={() => setActiveTab(RECEIVED)}
            className={`w-full rounded-lg bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${
              activeTab === RECEIVED ? "text-white" : "text-purple-700"
            }`}
          >
            <span className="relative z-30">Recieved</span>
          </button>
          <button
            onClick={() => setActiveTab(SENT)}
            className={`w-full rounded-lg bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${
              activeTab === SENT ? "text-white" : "text-purple-700"
            }`}
          >
            <span className="relative z-30">Sent</span>
          </button>
          <div
            className={`absolute top-1/2 z-20 h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-lg bg-purple-700 duration-200 ease-in-out ${
              activeTab === SENT ? "left-[50%]" : "left-[0.5rem]"
            }`}
          ></div>
        </div>
        <div className="my-2 mb-4 flex h-1 grow flex-col gap-2 overflow-y-scroll">
          {allUserProfiles.map((p) => (
            <FriendRequestCard key={p.id} tab={activeTab} user={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchFriendsResult({ notFound }: { notFound: boolean }) {
  return (
    <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 dark:bg-gray-750">
      <PiUserCirclePlusThin className="flex-shrink-0 text-5xl text-purple-700 dark:text-white" />
      <h2 className="leading-5 text-purple-700 dark:text-white md:text-lg md:leading-6">
        {notFound
          ? "No user found with that email"
          : "Search for friends using email"}
      </h2>
    </div>
  );
}

interface FriendRequestCardProps {
  tab: FriendRequestCardType;
  user: {
    username: string;
    email: string;
    requestSent: string;
  };
}

function FriendRequestCard(props: FriendRequestCardProps) {
  const { tab, user } = props;

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-750">
      <div className="flex gap-2">
        <DefaultProfilePicture />
        <div>
          <h2 className="line-clamp-1 md:text-lg md:font-semibold">
            {user.username}
          </h2>
          <h2 className="line-clamp-1 text-sm md:text-base">{user.email}</h2>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <RequestAction tab={tab} />
        {tab !== FIND ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.requestSent}
          </span>
        ) : null}
      </div>
    </div>
  );
}

interface RequestActionProps {
  tab: FriendRequestCardType;
}

function RequestAction({ tab }: RequestActionProps) {
  switch (tab) {
    case RECEIVED:
      return (
        <div className="flex gap-2">
          <button className="rounded-full border-2 border-green-200 bg-green-200 px-3 text-green-500 duration-200 ease-in-out hover:border-green-500 hover:bg-transparent">
            <span className="hidden text-sm font-semibold md:inline">
              Accept
            </span>
            <FaCheck className="md:hidden" />
          </button>
          <button className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent">
            <span className="hidden text-sm font-semibold md:inline">
              Reject
            </span>
            <MdClose className="md:hidden" />
          </button>
        </div>
      );
    case SENT:
      return (
        <button className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent">
          <span className="hidden text-sm font-semibold md:inline">Cancel</span>
          <MdClose className="md:hidden" />
        </button>
      );
    case FIND:
      return (
        <button className="rounded-full border-2 border-purple-200 bg-purple-200 px-3 text-purple-500 duration-200 ease-in-out hover:border-purple-500 hover:bg-transparent">
          <span className="hidden text-sm font-semibold md:inline">
            Add friend
          </span>
          <IoMdAdd className="md:hidden" />
        </button>
      );
  }
}
