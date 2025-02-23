import { useEffect, useState } from "react";
import { customDelete, customPatch, customPost } from "@/utils/customAxios";

import { FaCheck as CheckIcon } from "react-icons/fa6";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdClose as CloseIcon } from "react-icons/md";

import { useFriendRequestStore, useUserProfileStore } from "../store";
import { ButtonContent } from "./ButtonContent";

import { ActionType } from "../types";
import { IFriend } from "@/interfaces/IFriend";

interface FriendRequestSent {
  request: IFriend;
}

interface RequestActionProps {
  tab: ActionType;
  userId: string;
}

export default function RequestAction({ tab, userId }: RequestActionProps) {
  const { setProfile, setSearch } = useUserProfileStore();

  const {
    sentRequests,
    receivedRequests,
    setSentRequests,
    setReceivedRequests,
  } = useFriendRequestStore();

  const [added, setAdded] = useState<boolean | undefined>(false);
  const [accepted, setAccepted] = useState<boolean | undefined>(false);
  const [rejected, setRejected] = useState<boolean | undefined>(false);
  const [canceled, setCanceled] = useState<boolean | undefined>(false);

  async function addFriend() {
    setAdded(undefined);

    const res = await customPost<FriendRequestSent>(
      `/api/friends?receiverId=${userId}`,
    );

    if (res && sentRequests) {
      setAdded(true);
      setSentRequests([...sentRequests, res.request]);
    }
  }

  async function acceptRequest() {
    setAccepted(undefined);

    const res = await customPatch(`/api/friends/accept?senderId=${userId}`);

    if (res && receivedRequests) {
      setAccepted(true);
      setReceivedRequests(
        receivedRequests.filter((r) => r.senderId !== userId),
      );
    }
  }

  async function rejectRequest() {
    setRejected(undefined);

    const res = await customPatch(`/api/friends/reject?senderId=${userId}`);

    if (res && receivedRequests) {
      setRejected(true);
      setReceivedRequests(
        receivedRequests.filter((r) => r.senderId !== userId),
      );
    }
  }

  async function cancelRequest() {
    setCanceled(undefined);

    const res = await customDelete(`/api/friends/?receiverId=${userId}`);

    if (res && sentRequests) {
      setCanceled(true);
      setSentRequests(sentRequests.filter((r) => r.receiverId !== userId));
    }
  }

  useEffect(() => {
    if (!added) return;

    const timeoutId = setTimeout(() => {
      setProfile(undefined);
      setSearch("");
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [added, setProfile, setSearch]);

  switch (tab) {
    case "RECEIVED":
      return (
        <div className="flex items-end justify-between gap-2">
          <div className="flex gap-2">
            <button
              onClick={acceptRequest}
              className="rounded-full border-2 border-green-200 bg-green-200 px-3 text-green-500 duration-200 ease-in-out hover:border-green-500 hover:bg-transparent"
            >
              <ButtonContent
                color="#22c55e"
                label={{ active: "Accepted", inactive: "Accept" }}
                status={accepted}
              />
              <CheckIcon className="md:hidden" />
            </button>
            <button
              onClick={rejectRequest}
              className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent"
            >
              <ButtonContent
                color="#ef4444"
                label={{ active: "Rejected", inactive: "Reject" }}
                status={rejected}
              />
              <CloseIcon className="md:hidden" />
            </button>
          </div>
        </div>
      );
    case "SENT":
      return (
        <div className="flex items-end justify-between gap-2">
          <button
            onClick={cancelRequest}
            className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent"
          >
            <ButtonContent
              color="#ef4444"
              label={{ active: "Canceled", inactive: "Cancel" }}
              status={canceled}
            />
            <CloseIcon className="md:hidden" />
          </button>
        </div>
      );
    case "FIND":
      return (
        <div className="flex items-end justify-between gap-2">
          <button
            disabled={added !== false}
            onClick={addFriend}
            className="rounded-full border-2 border-purple-200 bg-purple-200 px-3 text-purple-500 duration-200 ease-in-out hover:border-purple-500 hover:bg-transparent"
          >
            <ButtonContent
              color="#9333ea"
              label={{ active: "Request sent", inactive: "Add friend" }}
              status={added}
            />
            <AddIcon className="md:hidden" />
          </button>
        </div>
      );
  }
}
