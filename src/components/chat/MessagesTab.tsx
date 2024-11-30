import UserProfiles from "./UserProfiles";
import DefaultProfilePicture from "./DefaultProfilePicture";

export default function MessagesTab() {
  const username = "The Boss"; // TODO: replace

  return (
    <>
      <div className="grid h-32 place-items-center gap-1 py-2">
        <div className="relative size-[100px]">
          <DefaultProfilePicture largeSize />
        </div>
        <h1 className="text-lg md:text-xl md:font-semibold">{username}</h1>
      </div>
      <UserProfiles />
    </>
  );
}
