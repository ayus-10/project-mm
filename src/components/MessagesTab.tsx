import UserProfiles from "./UserProfiles";
import DefaultProfilePicture from "./DefaultProfilePicture";
import { useAppSelector } from "../redux/hooks";

export default function MessagesTab() {
  const { email, fullName } = useAppSelector(
    (state) => state.authenticatedUserSlice,
  );

  return (
    <>
      <div className="grid h-auto place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          <DefaultProfilePicture largeSize />
        </div>
        <h1 className="line-clamp-1 text-lg md:text-xl md:font-semibold">
          {fullName}
        </h1>
        <h2 className="line-clamp-1 text-base md:text-lg">{email}</h2>
      </div>
      <UserProfiles />
    </>
  );
}
