import Image from "next/image";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiUserCirclePlusThin } from "react-icons/pi";

const SENT = "sent";
const RECIEVED = "recieved";
const FIND = "find";

type ActiveTab = typeof SENT | typeof RECIEVED;

export default function FriendsTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(RECIEVED);
  const [_search, setSearch] = useState("");

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Find friends</h1>
        <div className="relative mb-2 w-full">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Email..."
            type="text"
            className="w-full rounded-full bg-white py-2 pl-4 pr-16 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <button className="absolute right-0 top-1/2 flex h-full w-14 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 px-2 text-xl text-white duration-200 ease-in-out hover:bg-purple-800">
            <IoSearch />
          </button>
        </div>
        <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 dark:bg-gray-750">
          <PiUserCirclePlusThin className="flex-shrink-0 text-5xl text-purple-700 dark:text-white" />
          <h2 className="leading-5 text-purple-700 dark:text-white md:text-lg md:leading-6">
            Search for friends using email
          </h2>
        </div>
      </div>
      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Friend requests</h1>
        <div className="relative flex justify-between gap-2 rounded-full bg-purple-200 p-2 dark:bg-gray-750">
          <button
            onClick={() => setActiveTab(RECIEVED)}
            className={`w-full rounded-full bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${activeTab === RECIEVED ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Recieved</span>
          </button>
          <button
            onClick={() => setActiveTab(SENT)}
            className={`w-full rounded-full bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${activeTab === SENT ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Sent</span>
          </button>
          <div
            className={`absolute top-1/2 z-20 h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-full bg-purple-700 duration-200 ease-in-out ${activeTab === SENT ? "left-[50%]" : "left-[0.5rem]"}`}
          ></div>
        </div>
        <div className="my-2 mb-4 flex h-1 grow flex-col gap-4 overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <FriendRequestCard key={`FriendRequest${index}`} tab={activeTab} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface FriendRequestCardProps {
  tab: typeof FIND | typeof RECIEVED | typeof SENT;
}

function FriendRequestCard(props: FriendRequestCardProps) {
  const { tab } = props;

  return (
    <div
      className={`flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-750 ${tab === FIND ? "h-16" : "h-auto"}`}
    >
      <Image
        height={50}
        width={50}
        src={
          "https://cdn.discordapp.com/avatars/833573797809750066/2f4530153f0d992c760ff2ba115380b5.webp"
        }
        alt="Profile picture"
        className="size-[50px] rounded-full"
      />
      <div className="flex grow flex-col">
        <h2 className="line-clamp-1 md:text-lg md:font-semibold">
          Olivia Isabel Rodrigo
        </h2>
        <div className="flex items-end justify-between gap-2">
          <RequestAction tab={tab} />
          {(tab === RECIEVED || tab === SENT) && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              1 day
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

interface RequestActionProps {
  tab: typeof FIND | typeof RECIEVED | typeof SENT;
}

function RequestAction({ tab }: RequestActionProps) {
  switch (tab) {
    case RECIEVED:
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
        <button className="rounded-full bg-purple-700 px-2 font-semibold duration-200 ease-in-out hover:bg-purple-800 dark:bg-purple-500 dark:hover:bg-purple-600">
          Add
        </button>
      );
  }
}
