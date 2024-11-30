import { FaUserCircle } from "react-icons/fa";

export default function DefaultProfilePicture({
  largeSize,
}: {
  largeSize?: boolean;
}) {
  return (
    <div
      className={`rounded-full bg-white text-gray-600 dark:text-gray-700 ${largeSize ? "size-[100px]" : "size-[50px]"}`}
    >
      <FaUserCircle className={largeSize ? "size-[100px]" : "size-[50px]"} />
    </div>
  );
}
