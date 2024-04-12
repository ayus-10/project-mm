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

  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);

  function toggleProfileInfoVisibility() {
    setShowProfileInfo(!showProfileInfo);
    if (isMobileScreen) {
      setShowNavigation(false);
    }
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
        showNavigation={showNavigation}
        setShowNavigation={setShowNavigation}
        isMobileScreen={isMobileScreen}
        setShowProfileInfo={setShowProfileInfo}
      />
      <ChatBody
        currentChat={currentChat}
        toggleProfileInfoVisibility={toggleProfileInfoVisibility}
      />
      <ProfileInfo
        currentChat={currentChat}
        showProfileInfo={showProfileInfo}
        toggleProfileInfoVisibility={toggleProfileInfoVisibility}
      />
    </div>
  );
}
