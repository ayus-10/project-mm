import { GET } from "../constants";
import { IUser } from "../interfaces/IUser";
import fetchMagic from "./fetchMagic";

export default async function findFriend(email: string) {
  try {
    const res = await fetchMagic<IUser>(
      `/api/Friends/find?email=${email}`,
      GET,
      undefined,
      true,
    );

    if (!res) return;

    return { data: res.data, error: res.error };
  } catch (error) {
    console.error("Unable to find friend: ", error);
  }
}
