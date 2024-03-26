import { useEffect, useRef } from "react";
import MessageBox from "./MessageBox";

export default function Chats() {
  const chatContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, []);

  return (
    <div
      ref={chatContainer}
      className="flex h-[calc(100dvh-5.5rem-5.25rem)] grow flex-col gap-6 overflow-y-scroll px-4 py-6 md:gap-8"
    >
      {Array.from({ length: 33 }).map((_, index) => (
        <MessageBox key={index} align={index % 2 == 0 ? "left" : "right"} />
      ))}
    </div>
  );
}
