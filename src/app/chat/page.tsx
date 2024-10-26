import ChatNavigation from "@/components/chat/ChatNavigation";
import ChatBody from "@/components/chat/ChatBody";

export default async function Chat() {
  // TODO: redirect if not logged in

  return (
    <div className="flex h-dvh w-screen select-none overflow-hidden bg-white text-gray-850 dark:bg-gray-800 dark:text-white">
      <ChatNavigation />
      <ChatBody />
    </div>
  );
}
