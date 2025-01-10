import { useContext } from "react";
import { MoonLoader as Loading } from "react-spinners";

import { IFriend } from "@/interfaces/IFriend";
import { ViewFriendsTab } from "./types";

import { AuthenticatedUserContext } from "@/contexts/AuthenticatedUserContext";
import FriendRequestCard from "./FriendCard";
import NotFound from "@/assets/empty.png";

interface FriendListProps {
  sent?: IFriend[];
  received?: IFriend[];
  all?: IFriend[];
  tab: ViewFriendsTab;
  isLoading: boolean;
}

export default function FriendList(props: FriendListProps) {
  const { tab, received, sent, all, isLoading } = props;

  const { user: loggedInUser } = useContext(AuthenticatedUserContext);

  const isLoggedInUserReceiver = (f: IFriend) =>
    f.receiverEmail === loggedInUser.email;

  const isValidArray = (arr: IFriend[] | undefined): arr is IFriend[] =>
    Array.isArray(arr) && arr.length > 0;

  const isSentTab = tab === "SENT";
  const isReceivedTab = tab === "RECEIVED";
  const isAllTab = tab === "ALL";

  const showSent = isSentTab && isValidArray(sent);
  const showReceived = isReceivedTab && isValidArray(received);
  const showAll = isAllTab && isValidArray(all);

  const errorMessage =
    isSentTab && !isValidArray(sent)
      ? "You have not sent any requests yet."
      : isReceivedTab && !isValidArray(received)
        ? "You have not received any requests yet."
        : isAllTab && !isValidArray(all)
          ? "You have not made any friends yet."
          : null;

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
            ? all.map((f) => (
                <FriendRequestCard
                  key={f.friendId}
                  tab={tab}
                  user={{
                    email: isLoggedInUserReceiver(f)
                      ? f.senderEmail
                      : f.receiverEmail,
                    fullName: isLoggedInUserReceiver(f)
                      ? f.senderFullName
                      : f.receiverFullName,
                    id: isLoggedInUserReceiver(f) ? f.senderId : f.receiverId,
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
