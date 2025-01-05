import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";

interface ToggleSwitchProps {
  parent: "Notifications" | "Theme";
  checked: boolean;
}

export default function ToggleSwitch(props: ToggleSwitchProps) {
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
      <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-700 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:peer-checked:bg-purple-500 rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  );
}
