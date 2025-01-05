import { FriendRequestCardType } from "../types";

import DefaultProfilePicture from "../../../../../DefaultProfilePicture";
import RequestAction from "./RequestAction";

interface FriendRequestCardProps {
  tab: FriendRequestCardType;
  user: {
    id: string;
    fullName: string;
    email: string;
    requestSent?: string;
  };
}

export default function FriendRequestCard(props: FriendRequestCardProps) {
  const { tab, user } = props;

  return (
    <div className="flex w-full flex-col gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-750">
      <div className="flex gap-2">
        <DefaultProfilePicture />
        <div>
          <h2 className="line-clamp-1 md:text-lg md:font-semibold">
            {user.fullName}
          </h2>
          <h2 className="line-clamp-1 text-sm md:text-base">{user.email}</h2>
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <RequestAction tab={tab} userId={user.id} />
        {user.requestSent ? (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.requestSent}
          </span>
        ) : null}
      </div>
    </div>
  );
}
