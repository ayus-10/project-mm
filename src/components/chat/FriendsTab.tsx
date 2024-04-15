import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { PiUserFocusLight } from "react-icons/pi";

type ActiveTab = "sent" | "recieved";

export default function FriendsTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("recieved");
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="relative w-full">
          <input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Email..."
            type="text"
            className="w-full rounded-full border-2 border-transparent bg-white py-2 pl-4 pr-16 outline-none duration-200 ease-in-out focus:border-purple-700 dark:bg-gray-750"
          />
          <button className="absolute right-0 top-1/2 flex h-full w-14 -translate-y-1/2 items-center justify-center rounded-full bg-purple-700 px-2 text-xl text-white duration-200 ease-in-out hover:bg-purple-800">
            <IoSearch />
          </button>
        </div>
        <div className="flex h-16 items-center justify-center rounded-lg bg-purple-200 px-2 dark:bg-gray-750">
          <PiUserFocusLight className="text-6xl text-purple-700 dark:text-white" />
          <h2 className="text-lg font-semibold leading-6 text-purple-700 dark:text-white">
            Search for friends using email
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="relative flex justify-between gap-2 rounded-full bg-purple-200 p-2 dark:bg-gray-750">
          <button
            onClick={() => setActiveTab("recieved")}
            className={`w-full rounded-full bg-purple-300 px-6 py-2 font-bold duration-200 ease-in-out ${activeTab === "recieved" ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Recieved</span>
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`w-full rounded-full bg-purple-300 px-6 py-2 font-bold duration-200 ease-in-out ${activeTab === "sent" ? "text-white" : "text-purple-700"}`}
          >
            <span className="relative z-30">Sent</span>
          </button>
          <div
            className={`absolute top-1/2 z-20 h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-full bg-purple-700 duration-200 ease-in-out ${activeTab === "sent" ? "left-[50%]" : "left-[0.5rem]"}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
