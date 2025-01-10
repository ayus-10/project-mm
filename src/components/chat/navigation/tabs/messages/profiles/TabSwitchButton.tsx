import { Dispatch, SetStateAction } from "react";
import { ActiveTab } from "./types";

interface TabSwitchButtonProps {
  currentTab: ActiveTab;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}

export default function TabSwitchButton(props: TabSwitchButtonProps) {
  const { activeTab, setActiveTab, currentTab } = props;

  return (
    <button
      onClick={() => setActiveTab(currentTab)}
      className={`cursor-pointer rounded-full px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${
        activeTab === currentTab
          ? "bg-purple-700 dark:bg-purple-500"
          : "bg-purple-300"
      }`}
    >
      {currentTab}
    </button>
  );
}
