import ChatNavigation from "@/components/chat/navigation/ChatNavigation";
import ChatBody from "@/components/chat/body/ChatBody";

export default function Chat() {
  return (
    <div className="flex h-dvh w-screen select-none overflow-hidden bg-white text-gray-850 dark:bg-gray-800 dark:text-white">
      <ChatNavigation />
      <ChatBody />
    </div>
  );
}
