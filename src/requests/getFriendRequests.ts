import { GET } from "../constants";
import { IFriend } from "../interfaces/IFriend";
import fetchMagic from "./fetchMagic";

interface FriendRequests {
  sent: IFriend[];
  received: IFriend[];
}

export default async function getFriendRequests() {
  try {
    const res = await fetchMagic<FriendRequests>(
      "/api/Friends/requests",
      GET,
      undefined,
      true,
    );
    if (!res) return;
    return res.data;
  } catch (error) {
    console.error("Unable to fetch friend requests: ", error);
  }
}
