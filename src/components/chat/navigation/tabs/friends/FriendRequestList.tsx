import { MoonLoader as Loading } from "react-spinners";

import { IFriend } from "../../../../../interfaces/IFriend";
import { ActiveTab } from "./types";

import FriendRequestCard from "./requestCard/FriendRequestCard";

interface FriendRequestListProps {
  sent?: IFriend[];
  received?: IFriend[];
  tab: ActiveTab;
  isLoading: boolean;
}

export default function FriendRequestList(props: FriendRequestListProps) {
  const { tab, received, sent, isLoading } = props;

  const isValidArray = (arr: IFriend[] | undefined): arr is IFriend[] =>
    Array.isArray(arr) && arr.length > 0;

  const showSent = tab === "SENT" && isValidArray(sent);
  const showReceived = tab === "RECEIVED" && isValidArray(received);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading color="#9333ea" />
      </div>
    );
  }

  return (
    <div className="my-2 mb-4 flex h-1 grow flex-col items-center gap-2 overflow-y-auto">
      {showSent
        ? sent.map((s) => (
            <FriendRequestCard
              key={s.friendId}
              tab={tab}
              user={{
                email: s.receiverEmail,
                fullName: s.receiverFullName,
                id: s.receiverId,
              }}
            />
          ))
        : showReceived
          ? received.map((r) => (
              <FriendRequestCard
                key={r.friendId}
                tab={tab}
                user={{
                  email: r.senderEmail,
                  fullName: r.senderFullName,
                  id: r.senderId,
                }}
              />
            ))
          : "No requests found."}
    </div>
  );
}
