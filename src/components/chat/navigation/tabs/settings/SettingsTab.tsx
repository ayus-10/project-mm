import { useState } from "react";

import {
  FaBell as NotificationsIcon,
  FaLock as PrivacyIcon,
  FaMoon as ThemeIcon,
} from "react-icons/fa";
import { FaShield as SecurityIcon } from "react-icons/fa6";

import { SettingsList } from "./SettingsList";

export function SettingsTab() {
  const settingItems = [
    {
      text: "Notifications",
      icon: <NotificationsIcon />,
    },
    {
      text: "Theme",
      icon: <ThemeIcon />,
    },
    {
      text: "Privacy",
      icon: <PrivacyIcon />,
    },
    {
      text: "Security",
      icon: <SecurityIcon />,
    },
  ];

  const [setting, setSetting] = useState("");

  return (
    <div className="flex flex-col gap-2">
      {settingItems.map((item) => (
        <div key={item.text}>
          <button
            onClick={() => setSetting(item.text)}
            className={`flex w-full cursor-pointer items-center gap-4 border-b-2 border-purple-300 bg-white px-4 py-3 text-purple-700 duration-200 ease-in-out hover:bg-purple-100 dark:border-purple-500 dark:bg-gray-750 dark:hover:bg-gray-800
              ${setting === item.text ? "rounded-t-md" : "rounded-md"}
            `}
          >
            <div className="text-purple-700 dark:text-purple-500">
              {item.icon}
            </div>
            <span className="text-gray-850 dark:text-white">{item.text}</span>
          </button>
          {setting === item.text ? (
            <div className="rounded-b-md bg-white dark:bg-gray-750">
              <SettingsList tab={item.text} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
