import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { FaCheck as CheckIcon } from "react-icons/fa6";
import { IoMdAdd as AddIcon } from "react-icons/io";
import { MdClose as CloseIcon } from "react-icons/md";

import { useFriendRequestStore, useUserProfileStore } from "../store";
import { ButtonContent } from "./ButtonContent";

import { ACCESS_TOKEN } from "@/constants";
import refreshTokens from "@/requests/refreshTokens";

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
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });

  const { setProfile, setSearch } = useUserProfileStore();

  const {
    sentRequests,
    allFriends,
    receivedRequests,
    setSentRequests,
    setReceivedRequests,
    setAllFriends,
  } = useFriendRequestStore();

  const [added, setAdded] = useState<boolean | undefined>(false);
  const [accepted, setAccepted] = useState<boolean | undefined>(false);
  const [rejected, setRejected] = useState<boolean | undefined>(false);
  const [canceled, setCanceled] = useState<boolean | undefined>(false);

  async function addFriend() {
    const sendRequest = () =>
      axiosWithAuth.post<FriendRequestSent>(
        "/api/Friends?receiverId=" + userId,
      );

    const handleResponse = (request: IFriend) => {
      setAdded(true);
      if (sentRequests) setSentRequests([...sentRequests, request]);
    };

    try {
      setAdded(undefined);
      const { data } = await sendRequest();
      handleResponse(data.request);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        try {
          await refreshTokens();
          const { data } = await sendRequest();
          handleResponse(data.request);
        } catch {
          setAdded(false);
        }
      }
    }
  }

  async function acceptRequest() {
    const sendRequest = () =>
      axiosWithAuth.patch("/api/Friends/accept?senderId=" + userId);

    const handleResponse = () => {
      setAccepted(true);

      if (!receivedRequests) return;

      setReceivedRequests(
        receivedRequests.filter((r) => r.senderId !== userId),
      );

      const acceptedRequest = receivedRequests.find(
        (r) => r.senderId === userId,
      );

      if (!acceptedRequest || !allFriends) return;

      setAllFriends([...allFriends, acceptedRequest]);
    };

    await handleRequest(sendRequest, handleResponse, setAccepted);
  }

  async function rejectRequest() {
    const sendRequest = () =>
      axiosWithAuth.patch("/api/Friends/reject?senderId=" + userId);

    const handleResponse = () => {
      setRejected(true);
      if (receivedRequests)
        setReceivedRequests(
          receivedRequests.filter((r) => r.senderId !== userId),
        );
    };

    await handleRequest(sendRequest, handleResponse, setRejected);
  }

  async function cancelRequest() {
    const sendRequest = () =>
      axiosWithAuth.delete("/api/Friends/?receiverId=" + userId);

    const handleResponse = () => {
      setCanceled(true);
      if (sentRequests)
        setSentRequests(sentRequests.filter((r) => r.receiverId !== userId));
    };

    await handleRequest(sendRequest, handleResponse, setCanceled);
  }

  async function handleRequest(
    sendRequest: () => Promise<AxiosResponse<unknown, unknown>>,
    handleResponse: () => void,
    setState: (value: React.SetStateAction<boolean | undefined>) => void,
  ) {
    try {
      setState(undefined);
      await sendRequest();
      handleResponse();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        try {
          await refreshTokens();
          await sendRequest();
          handleResponse();
        } catch {
          setState(false);
        }
      }
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
