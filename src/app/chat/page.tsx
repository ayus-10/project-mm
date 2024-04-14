import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import ChatNavigation from "@/components/chat/ChatNavigation";
import ChatBody from "@/components/chat/ChatBody";
import ProfileInfo from "@/components/chat/ProfileInfo";

export type CurrentChatData = {
  username: string;
  profilePictureUrl: string;
  status: "Active" | "Inactive";
};

export default async function Chat() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const currentChat: CurrentChatData = {
    username: "John Doe",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/833573797809750066/2f4530153f0d992c760ff2ba115380b5.webp?size=100",
    status: "Active",
  };

  return (
    <div className="flex h-dvh w-screen overflow-hidden bg-white text-gray-850 dark:bg-gray-800 dark:text-white">
      <ChatNavigation />
      <ChatBody currentChat={currentChat} />
      <ProfileInfo currentChat={currentChat} />
    </div>
  );
}
