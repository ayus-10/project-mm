import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { PiUserCirclePlusThin } from "react-icons/pi";
import DefaultProfilePicture from "./DefaultProfilePicture";
import { IoMdAdd } from "react-icons/io";
import { IUser } from "../interfaces/IUser";
import { IFriend } from "../interfaces/IFriend";
import axios, { AxiosResponse } from "axios";
import { ACCESS_TOKEN } from "../constants";
import { BeatLoader, MoonLoader } from "react-spinners";
import refreshTokens from "../requests/refreshTokens";
import { create } from "zustand";

const SENT = "SENT";
const RECEIVED = "RECEIVED";
const FIND = "FIND";

type ActiveTab = "SENT" | "RECEIVED";
type FriendRequestCardType = "FIND" | "RECEIVED" | "SENT";

interface FriendRequests {
  sent: IFriend[];
  received: IFriend[];
}

interface FriendRequestSent {
  request: IFriend;
}

interface UserProfileStore {
  search: string;
  setSearch: (value: string) => void;
  profile: IUser | undefined;
  setProfile: (profile: IUser | undefined) => void;
}

const useUserProfileStore = create<UserProfileStore>((set) => ({
  search: "",
  setSearch: (value) => set({ search: value }),
  profile: undefined,
  setProfile: (profile) => set({ profile }),
}));

interface FriendRequestStore {
  sentRequests: IFriend[] | undefined;
  receivedRequests: IFriend[] | undefined;
  setSentRequests: (requests: IFriend[] | undefined) => void;
  setReceivedRequests: (requests: IFriend[] | undefined) => void;
}

const useFriendRequestStore = create<FriendRequestStore>((set) => ({
  sentRequests: undefined,
  receivedRequests: undefined,
  setSentRequests: (requests) => set({ sentRequests: requests }),
  setReceivedRequests: (requests) => set({ receivedRequests: requests }),
}));

export default function FriendsTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(RECEIVED);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const { search, profile, setSearch, setProfile } = useUserProfileStore();

  const {
    sentRequests,
    setSentRequests,
    receivedRequests,
    setReceivedRequests,
  } = useFriendRequestStore();

  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const axiosWithAuth = useMemo(
    () =>
      axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      }),
    [],
  );

  function searchUserProfile(e: FormEvent) {
    e.preventDefault();

    if (!searchInputRef.current) {
      return;
    }

    if (search) {
      clearSearchStates();
      searchInputRef.current.value = "";
    } else {
      setSearch(searchInputRef.current.value.toLowerCase());
    }
  }

  function clearSearchStates() {
    setErrorMessage("");
    setSearch("");
    setProfile(undefined);
  }

  useEffect(() => {
    async function find() {
      const sendRequest = () =>
        axiosWithAuth.get<IUser>(`/api/Friends/find?email=${search}`);

      try {
        setLoadingProfile(true);
        const { data } = await sendRequest();
        setProfile(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          try {
            await refreshTokens();
            const { data } = await sendRequest();
            setProfile(data);
          } catch (newError) {
            if (axios.isAxiosError(newError))
              setErrorMessage(newError.response?.data);
          }
        }
      } finally {
        setLoadingProfile(false);
      }
    }

    if (search) find();
  }, [search, axiosWithAuth, setProfile]);

  useEffect(() => {
    async function getRequests() {
      const sendRequest = () =>
        axiosWithAuth.get<FriendRequests>("/api/Friends/requests");

      try {
        setLoadingRequests(true);
        const { data } = await sendRequest();
        setSentRequests(data.sent);
        setReceivedRequests(data.received);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const { data } = await sendRequest();
          setSentRequests(data.sent);
          setReceivedRequests(data.received);
        }
      } finally {
        setLoadingRequests(false);
      }
    }

    getRequests();
  }, [axiosWithAuth, setSentRequests, setReceivedRequests]);

  return (
    <div className="flex h-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Find friends</h1>
        <form className="relative mb-2 w-full" onSubmit={searchUserProfile}>
          <input
            ref={searchInputRef}
            onChange={clearSearchStates}
            placeholder="Email..."
            type="text"
            className="w-full rounded-lg bg-white py-2 pl-4 pr-16 shadow-black outline-none duration-200 ease-in-out hover:drop-shadow-md focus:drop-shadow-md dark:bg-gray-750"
          />
          <button className="absolute right-0 top-1/2 flex h-full w-14 -translate-y-1/2 items-center justify-center rounded-lg bg-purple-700 px-2 text-xl text-white duration-200 ease-in-out hover:bg-purple-800">
            {search ? <MdClose /> : <IoSearch />}
          </button>
        </form>
        <FriendRequestCard tab={FIND} user={profile} />
        <SearchFriendsResult
          error={errorMessage}
          show={!profile}
          isLoading={loadingProfile}
        />
      </div>
      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-xl">Friend requests</h1>
        <div className="relative flex justify-between gap-2 rounded-lg bg-purple-200 p-2 dark:bg-gray-750">
          <button
            onClick={() => setActiveTab(RECEIVED)}
            className={`w-full rounded-lg bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${
              activeTab === RECEIVED ? "text-white" : "text-purple-700"
            }`}
          >
            <span className="relative z-30">Recieved</span>
          </button>
          <button
            onClick={() => setActiveTab(SENT)}
            className={`w-full rounded-lg bg-purple-300 px-4 py-1 duration-200 ease-in-out md:px-6 md:py-2 md:font-semibold ${
              activeTab === SENT ? "text-white" : "text-purple-700"
            }`}
          >
            <span className="relative z-30">Sent</span>
          </button>
          <div
            className={`absolute top-1/2 z-20 h-[calc(100%-1rem)] w-[calc(50%-0.5rem)] -translate-y-1/2 rounded-lg bg-purple-700 duration-200 ease-in-out ${
              activeTab === SENT ? "left-[50%]" : "left-[0.5rem]"
            }`}
          />
        </div>
        <FriendRequestList
          sent={sentRequests}
          received={receivedRequests}
          tab={activeTab}
          isLoading={loadingRequests}
        />
      </div>
    </div>
  );
}

interface FriendRequestListProps {
  sent?: IFriend[];
  received?: IFriend[];
  tab: ActiveTab;
  isLoading: boolean;
}

function FriendRequestList(props: FriendRequestListProps) {
  const { tab, received, sent, isLoading } = props;

  const isValidArray = (arr: IFriend[] | undefined): arr is IFriend[] =>
    Array.isArray(arr) && arr.length > 0;

  const showSent = tab === SENT && isValidArray(sent);
  const showReceived = tab === RECEIVED && isValidArray(received);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <MoonLoader color="#9333ea" />
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

interface SearchFriendsResultProps {
  error: string;
  show: boolean;
  isLoading: boolean;
}

function SearchFriendsResult(props: SearchFriendsResultProps) {
  const { show, isLoading, error } = props;

  if (show)
    return (
      <div className="flex h-16 items-center justify-center gap-2 rounded-lg bg-purple-200 px-3 dark:bg-gray-750">
        <PiUserCirclePlusThin className="flex-shrink-0 text-5xl text-purple-700 dark:text-white" />
        <h2 className="leading-5 text-purple-700 dark:text-white md:text-lg md:leading-6">
          {isLoading
            ? "Searching, please wait..."
            : error || "Search for friends using email."}
        </h2>
      </div>
    );
}

interface FriendRequestCardProps {
  tab: FriendRequestCardType;
  user?: {
    id: string;
    fullName: string;
    email: string;
    requestSent?: string;
  };
}

function FriendRequestCard(props: FriendRequestCardProps) {
  const { tab, user } = props;

  if (user)
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

interface RequestActionProps {
  tab: FriendRequestCardType;
  userId: string;
}

function RequestAction({ tab, userId }: RequestActionProps) {
  const axiosWithAuth = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
    },
  });

  const { setProfile, setSearch } = useUserProfileStore();

  const {
    sentRequests,
    setSentRequests,
    receivedRequests,
    setReceivedRequests,
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
      if (receivedRequests)
        setReceivedRequests(
          receivedRequests.filter((r) => r.senderId !== userId),
        );
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
    sendRequest: () => Promise<AxiosResponse<any, any>>,
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
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [added, setProfile, setSearch]);

  switch (tab) {
    case RECEIVED:
      return (
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
            <FaCheck className="md:hidden" />
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
            <MdClose className="md:hidden" />
          </button>
        </div>
      );
    case SENT:
      return (
        <button
          onClick={cancelRequest}
          className="rounded-full border-2 border-red-200 bg-red-200 px-3 text-red-500 duration-200 ease-in-out hover:border-red-500 hover:bg-transparent"
        >
          <ButtonContent
            color="#ef4444"
            label={{ active: "Canceled", inactive: "Cancel" }}
            status={canceled}
          />
          <MdClose className="md:hidden" />
        </button>
      );
    case FIND:
      return (
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
          <IoMdAdd className="md:hidden" />
        </button>
      );
  }
}

interface ButtonContentProps {
  status: boolean | undefined;
  color: string;
  label: { active: string; inactive: string };
}

function ButtonContent({ status, color, label }: ButtonContentProps) {
  return (
    <span className="hidden text-sm font-semibold md:inline">
      {status === true ? (
        label.active
      ) : status === false ? (
        label.inactive
      ) : (
        <BeatLoader size={10} color={color} />
      )}
    </span>
  );
}
