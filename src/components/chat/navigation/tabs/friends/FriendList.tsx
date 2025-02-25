import { Loading } from "@/components/Loading";

import { IFriend } from "@/interfaces/IFriend";
import { ViewFriendsTab } from "./types";

import { FriendCard } from "./card/FriendCard";
import NotFound from "@/assets/empty.png";

interface FriendListProps {
  sent?: IFriend[];
  received?: IFriend[];
  tab: ViewFriendsTab;
  isLoading: boolean;
}

export function FriendList(props: FriendListProps) {
  const { tab, received, sent, isLoading } = props;

  const isValidArray = (arr: IFriend[] | undefined): arr is IFriend[] =>
    Array.isArray(arr) && arr.length > 0;

  const isSentTab = tab === "SENT";
  const isReceivedTab = tab === "RECEIVED";

  const showSent = isSentTab && isValidArray(sent);
  const showReceived = isReceivedTab && isValidArray(received);

  const errorMessage =
    isSentTab && !isValidArray(sent)
      ? "You have not sent any requests yet."
      : isReceivedTab && !isValidArray(received)
        ? "You have not received any requests yet."
        : null;

  if (isLoading) {
    return <Loading type="SMALL" />;
  }

  return (
    <div className="my-2 mb-4 flex h-1 grow flex-col items-center gap-2 overflow-y-auto">
      {showSent
        ? sent.map((s) => (
            <FriendCard
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
              <FriendCard
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
      {errorMessage ? (
        <div className="flex flex-col items-center py-4">
          <img className="size-[125px]" src={NotFound} alt="Not found" />
          <span>{errorMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
