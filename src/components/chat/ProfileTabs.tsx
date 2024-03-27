import { useState } from "react";

export default function ProfileTabs() {
  const tabs = ["Media", "Files", "Links"];
  const [activeTab, setActiveTab] = useState("Media");

  return (
    <div className="flex w-full justify-between gap-2">
      {tabs.map((tab, index) => (
        <button
          key={`tabItemNumber${index}`}
          className="group cursor-pointer"
          onClick={() => setActiveTab(tab)}
        >
          <span className="font-semibold">{tab}</span>
          <div
            className={`h-0.5 w-full duration-200 ease-in-out group-hover:bg-purple-700 ${activeTab === tab ? "bg-purple-700" : "bg-transparent"}`}
          ></div>
        </button>
      ))}
    </div>
  );
}
