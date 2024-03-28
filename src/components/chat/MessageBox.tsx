import Image from "next/image";
import { MessageBodyJson } from "./MessageBody";

type MessageBoxProps = {
  align: "left" | "right";
} & MessageBodyJson;

export default function MessageBox(props: MessageBoxProps) {
  const {
    align,
    username,
    profilePictureUrl,
    sentTime,
    receivedTime,
    messageText,
  } = props;

  return (
    <div
      className={`flex w-full ${align === "left" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`flex w-1/2 items-start gap-2 md:gap-3 lg:items-center ${align === "left" ? "flex-row" : "flex-row-reverse"}`}
      >
        <Image
          priority
          alt={`Profile picture of ${username}`}
          src={profilePictureUrl}
          height={50}
          width={50}
          className="rounded-full"
        ></Image>
        <div className="flex flex-col">
          <span className="p-1 text-xs text-gray-500 dark:text-gray-400 md:text-sm lg:p-0">
            {sentTime}
          </span>
          <div className="flex flex-col items-start gap-4 rounded-lg bg-gray-200 p-2 dark:bg-gray-800 lg:flex-row lg:items-end lg:px-4 lg:py-3">
            <p className="text-sm md:text-base">{messageText}</p>
            <span className="text-right text-xs">{receivedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
