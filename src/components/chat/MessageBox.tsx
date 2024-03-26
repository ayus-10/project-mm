import Image from "next/image";
import DemoUser from "../../assets/demouser.webp";

export default function MessageBox({ align }: { align: "left" | "right" }) {
  return (
    <div
      className={`flex w-full ${align === "left" ? "justify-start" : "justify-end"}`}
    >
      <div
        className={`flex w-1/2 items-start gap-2 md:gap-3 lg:items-center ${align === "left" ? "flex-row" : "flex-row-reverse"}`}
      >
        <Image
          alt="Demo User"
          src={DemoUser}
          height={50}
          width={50}
          className="rounded-full"
        ></Image>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 md:text-sm">
            26 Mar, 2024 11:59 AM
          </span>
          <div className="flex flex-col items-start gap-4 rounded-lg bg-gray-200 px-4 py-3 lg:flex-row lg:items-end">
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing.
            </p>
            <span className="text-xs">04:20PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
