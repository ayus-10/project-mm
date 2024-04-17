import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaFile } from "react-icons/fa";

type ActiveTab = "Media" | "Files" | "Links";

export default function ProfileTabs() {
  const tabs: ActiveTab[] = ["Media", "Files", "Links"];
  const [activeTab, setActiveTab] = useState<ActiveTab>("Media");

  return (
    <div className="mb-4 flex h-1 grow flex-col">
      <div className="mb-4 flex w-full justify-between gap-2 rounded-sm bg-white px-4 py-1 dark:bg-gray-750 md:gap-8 md:px-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className="group cursor-pointer"
            onClick={() => setActiveTab(tab)}
          >
            <span className="font-semibold">{tab}</span>
            <div
              className={`h-0.5 w-full rounded-full duration-200 ease-in-out group-hover:bg-purple-700 dark:group-hover:bg-purple-500 ${activeTab === tab ? "bg-purple-700 dark:bg-purple-500" : "bg-transparent"}`}
            ></div>
          </button>
        ))}
      </div>
      <Attachment tab={activeTab} />
    </div>
  );
}

function Attachment({ tab }: { tab: ActiveTab }) {
  switch (tab) {
    case "Media":
      return (
        <div className="grid grid-cols-2 place-items-center gap-2 overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <Image
              key={`AttachedImage${index}`}
              src={
                "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=120&ixid=MnwxfDB8MXxyYW5kb218MHx8Zmxvd2Vyc3x8fHx8fDE3MTE3MDA3MTg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=120"
              }
              alt="Attached media"
              height={120}
              width={120}
              className="size-[120px] rounded-md"
            ></Image>
          ))}
        </div>
      );
    case "Files":
      return (
        <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={`AttachedFile${index}`}
              className="flex w-full cursor-pointer items-center gap-1 rounded-md border-2 border-gray-300 bg-gray-300 px-2 py-1 duration-200 ease-in-out hover:bg-transparent dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-transparent md:w-72"
            >
              <FaFile className="hidden size-[2.5rem] text-red-500 md:block" />
              <div className="flex w-[14rem] flex-col justify-center gap-2">
                <h2 className="w-full truncate leading-4">filename.pdf</h2>
                <div className="flex w-full justify-between gap-2">
                  <span className="truncate text-sm leading-4 text-gray-500">
                    1024mb
                  </span>
                  <span className="truncate text-sm leading-4 text-gray-500">
                    27 Mar, 2024 09:20 AM
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "Links":
      return (
        <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, index) => (
            <Link
              href={"https://messenger-app-iota-two.vercel.app/chat"}
              key={`AttachedLink${index}`}
              className="group flex w-full cursor-pointer flex-col gap-2 rounded-md border-2 border-gray-300 bg-gray-300 px-2 py-1 duration-200 ease-in-out hover:bg-transparent dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-transparent md:w-72"
            >
              <span className="line-clamp-2 w-full leading-4 group-hover:underline">
                https://messenger-app-iota-two.vercel.app/chat
              </span>
              <span className="truncate text-sm leading-4 text-gray-500">
                27 Mar, 2024 09:20 AM
              </span>
            </Link>
          ))}
        </div>
      );
  }
}
