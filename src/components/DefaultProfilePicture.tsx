import { FaUserCircle as UserIcon } from "react-icons/fa";

export function DefaultProfilePicture({ largeSize }: { largeSize?: boolean }) {
  return (
    <div
      className={`rounded-full bg-white text-gray-600 dark:text-gray-700 ${
        largeSize ? "size-[100px]" : "size-[50px]"
      }`}
    >
      <UserIcon className={largeSize ? "size-[100px]" : "size-[50px]"} />
    </div>
  );
}
