import { MoonLoader as Loading } from "react-spinners";

import { IFriend } from "@/interfaces/IFriend";
import { ViewFriendsTab } from "./types";

import NotFound from "@/assets/empty.png";

import FriendRequestCard from "./FriendCard";

interface FriendListProps {
  sent?: IFriend[];
  received?: IFriend[];
  all?: IFriend[];
  tab: ViewFriendsTab;
  isLoading: boolean;
}

export default function FriendList(props: FriendListProps) {
  const { tab, received, sent, all, isLoading } = props;

  const isValidArray = (arr: IFriend[] | undefined): arr is IFriend[] =>
    Array.isArray(arr) && arr.length > 0;

  const isSentTab = tab === "SENT";
  const isReceivedTab = tab === "RECEIVED";
  const isAllTab = tab === "ALL";

  const showSent = isSentTab && isValidArray(sent);
  const showReceived = isReceivedTab && isValidArray(received);
  const showAll = isAllTab && isValidArray(all);

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
          : showAll
            ? all.map((r) => (
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
            : null}
      <div className="flex flex-col items-center py-4">
        <img className="size-[125px]" src={NotFound} alt="Not found" />
        <span>
          {isSentTab && !isValidArray(sent)
            ? "You have not sent any requests yet."
            : isReceivedTab && !isValidArray(received)
              ? "You have not received any requests yet."
              : isAllTab && !isValidArray(all)
                ? "You have not made any friends yet."
                : null}
        </span>
      </div>
    </div>
  );
}
