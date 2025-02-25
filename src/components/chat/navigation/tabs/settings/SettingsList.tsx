import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

import { ToggleSwitch } from "./ToggleSwitch";

export function SettingsList({ tab }: { tab: string }) {
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
