import { HashLoader, BeatLoader } from "react-spinners";

interface LoadingProps {
  type: "FULL" | "SMALL";
}

export default function Loading({ type }: LoadingProps) {
  switch (type) {
    case "FULL":
      return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
          <HashLoader color="#a855f7" />
          <h1 className="text-2xl font-bold text-purple-500">
            Loading, please wait
          </h1>
        </div>
      );
    case "SMALL":
      return (
        <div className="flex h-full w-full justify-center pt-12">
          <BeatLoader color="#a855f7" />
        </div>
      );
  }
}
