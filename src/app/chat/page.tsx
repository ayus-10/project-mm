"use client";
import { useState } from "react";
import { useMobileScreen } from "@/hooks/useMobileScreen";
import ChatNavigation from "@/components/chat/ChatNavigation";
import ChatBody from "@/components/chat/ChatBody";
import ProfileInfo from "@/components/chat/ProfileInfo";

export type CurrentChatData = {
  username: string;
  profilePictureUrl: string;
  status: "Active" | "Inactive";
};

export default function Chat() {
  const isMobileScreen = useMobileScreen(); // Returns true if screen width < 768px

  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  function toggleUserInfoVisibility() {
    setShowUserInfo(!showUserInfo);
    if (isMobileScreen) setShowMenu(false);
  }

  const currentChat: CurrentChatData = {
    username: "John Doe",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/833573797809750066/2f4530153f0d992c760ff2ba115380b5.webp?size=100",
    status: "Active",
  };

  return (
    <div className="flex h-dvh w-screen overflow-hidden bg-white text-gray-850 dark:bg-gray-900 dark:text-white">
      <ChatNavigation
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        isMobileScreen={isMobileScreen}
        setShowUserInfo={setShowUserInfo}
      />
      <ChatBody
        currentChat={currentChat}
        toggleUserInfoVisibility={toggleUserInfoVisibility}
      />
      <ProfileInfo
        currentChat={currentChat}
        showUserInfo={showUserInfo}
        toggleUserInfoVisibility={toggleUserInfoVisibility}
      />
    </div>
  );
}
