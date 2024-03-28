import ThemeContext from "@/contexts/ThemeContext";
import { useContext, useState } from "react";
import { FaBell, FaLock, FaMoon } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";

export default function SettingsMenu() {
  const settingItems = [
    {
      text: "Notifications",
      icon: <FaBell />,
    },
    {
      text: "Theme",
      icon: <FaMoon />,
    },
    {
      text: "Privacy",
      icon: <FaLock />,
    },
    {
      text: "Security",
      icon: <FaShield />,
    },
  ];

  const [setting, setSetting] = useState("none");

  return (
    <div className="flex flex-col gap-2">
      {settingItems.map((item, index) => (
        <div key={`settingItemNumber${index}`}>
          <button
            onClick={() => setSetting(item.text)}
            className="flex w-full cursor-pointer items-center gap-4 border-b-2 border-purple-300 bg-white px-4 py-3 text-purple-700 duration-200 ease-in-out hover:bg-purple-300"
          >
            {item.icon}
            <span className="text-gray-900">{item.text}</span>
          </button>
          {setting === item.text && (
            <div className="bg-white">
              <Settings tab={item.text} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Settings({ tab }: { tab: string }) {
  const { darkTheme } = useContext(ThemeContext);

  switch (tab) {
    case "Notifications":
      return (
        <div className="flex items-center justify-between px-4 py-3">
          <span>Show notifications</span>
          <ToggleSwitch parent={tab} checked={false} />
        </div>
      );
    case "Theme":
      return (
        <div className="flex items-center justify-between px-4 py-3">
          <span>Dark theme</span>
          <ToggleSwitch parent={tab} checked={darkTheme} />
        </div>
      );
  }
}

type ToggleSwitchProps = {
  parent: "Notifications" | "Theme";
  checked: boolean;
};

function ToggleSwitch(props: ToggleSwitchProps) {
  const { parent, checked } = props;

  const { toggleTheme } = useContext(ThemeContext);

  function handleChange() {
    if (parent == "Theme") {
      toggleTheme();
    }
  }

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onChange={handleChange}
        checked={checked}
      />
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
    </label>
  );
}
