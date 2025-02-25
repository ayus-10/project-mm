import { MdDelete as DeleteIcon } from "react-icons/md";
import { DefaultProfilePicture } from "@/components/DefaultProfilePicture";
import { timeDifferenceFromNow } from "@/utils/timeDifferenceFromNow";

interface UserProfileCardProps {
  fullName: string;
  lastMessage: string;
  sentTime: string;
  hasUnseenMessages: boolean;
}

export function UserProfileCard(props: UserProfileCardProps) {
  const { fullName, lastMessage, sentTime, hasUnseenMessages } = props;

  return (
    <div className="group my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md dark:hover:bg-gray-750">
      <DefaultProfilePicture />
      <div className="relative flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            {fullName}
          </h2>
          <p className="line-clamp-1 text-xs text-gray-600 dark:text-gray-400 md:text-sm">
            {lastMessage}
          </p>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs group-hover:invisible">
          <span className="text-right text-gray-500 dark:text-gray-400">
            {timeDifferenceFromNow(sentTime)}
          </span>
          {hasUnseenMessages ? (
            <div className="grid size-2 flex-shrink-0 place-content-center rounded-full bg-purple-700 text-white dark:bg-purple-500" />
          ) : null}
        </div>
        <div className="hidden place-content-center group-hover:block">
          <div className="size-8 flex-shrink-0 rounded-full bg-red-500 p-2 text-white duration-200 ease-in-out hover:bg-red-600 dark:border-gray-700">
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
