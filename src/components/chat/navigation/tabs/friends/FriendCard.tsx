import { ActionType, ViewFriendsTab } from "./types";

import DefaultProfilePicture from "@/components/DefaultProfilePicture";
import RequestAction from "./actions/RequestAction";

interface FriendCardProps {
  tab: ActionType | ViewFriendsTab;
  user: {
    id: string;
    fullName: string;
    email: string;
    requestSent?: string;
  };
}

export default function FriendCard(props: FriendCardProps) {
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
      {tab !== "ALL" ? <RequestAction tab={tab} userId={user.id} /> : null}
      {user.requestSent ? (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.requestSent}
        </span>
      ) : null}
    </div>
  );
}
