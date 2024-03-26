import Image from "next/image";
import DemoUser from "../../assets/demouser.webp";

export default function UserProfileCard() {
  return (
    <div className="my-3 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1 shadow-black duration-200 ease-in-out hover:bg-white hover:shadow-md">
      <Image
        src={DemoUser}
        className="size-[50px] rounded-full"
        height={50}
        width={50}
        alt="User profile"
      ></Image>
      <div className="flex grow">
        <div className="flex grow flex-col">
          <h2 className="line-clamp-1 text-sm font-semibold md:text-base">
            Username Here
          </h2>
          <p className="line-clamp-2 text-xs text-gray-600 md:text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi, et?
          </p>
        </div>
        <div className="flex flex-col items-end justify-center gap-2 text-xs">
          <span className="text-gray-500">04:20</span>
          <div className="grid size-4 place-content-center rounded-full bg-purple-700 text-white">
            5
          </div>
        </div>
      </div>
    </div>
  );
}
