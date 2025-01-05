import { Dispatch, SetStateAction } from "react";
import { ActiveTab } from "./types";

interface SpecialButtonProps {
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  text: string;
}

export default function SpecialButton(props: SpecialButtonProps) {
  const { activeTab, setActiveTab, text } = props;

  return (
    <button
      onClick={() => setActiveTab("NEW")}
      className={`cursor-pointer rounded-full px-3 text-sm font-medium text-white duration-200 ease-in-out hover:bg-purple-700 dark:hover:bg-purple-500 ${
        activeTab === "NEW"
          ? "bg-purple-700 dark:bg-purple-500"
          : "bg-purple-300"
      }`}
    >
      {text}
    </button>
  );
}
