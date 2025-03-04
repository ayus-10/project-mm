import { IMessage } from "@/interfaces/IMessage";
import { DefaultProfilePicture } from "@/components/DefaultProfilePicture";

interface MessageBoxProps extends IMessage {
  align: "LEFT" | "RIGHT";
}

export function MessageBox(props: MessageBoxProps) {
  const { align, sentTime, receivedTime, messageText } = props;

  return (
    <div
      className={`flex w-full ${
        align === "RIGHT" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex w-1/2 items-start gap-2 md:gap-3 lg:items-center ${
          align === "LEFT" ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <DefaultProfilePicture />
        <div className="flex flex-col">
          <span className="p-1 text-xs text-gray-500 dark:text-gray-400 md:text-sm lg:p-0">
            {sentTime}
          </span>
          <div className="flex flex-col items-start gap-4 rounded-lg bg-gray-200 p-2 dark:bg-gray-850 lg:flex-row lg:items-end lg:px-4 lg:py-3">
            <p className="select-all text-sm md:text-base">{messageText}</p>
            <span className="text-right text-xs">{receivedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
