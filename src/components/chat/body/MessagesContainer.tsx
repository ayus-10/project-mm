import { useContext, useEffect, useRef, useState } from "react";

import { PiPaperPlaneTiltFill as SendMessageIcon } from "react-icons/pi";
import allMessages from "@/assets/dummy_messages.json";

import { AuthenticatedUserContext } from "@/contexts/AuthenticatedUserContext";
import { MessageBox } from "./MessageBox";

export function MessagesContainer({ search }: { search: string }) {
  const chatContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [chatContainer]);

  const [messages, setMessages] = useState(allMessages);

  useEffect(() => {
    if (search) {
      const filteredMessages = allMessages.filter((message) =>
        message.messageText.toLowerCase().includes(search),
      );
      setMessages(filteredMessages);
    } else {
      setMessages(allMessages);
    }
  }, [search]);

  const {
    user: { email: loggedInUser },
  } = useContext(AuthenticatedUserContext);

  return (
    <div className="flex grow flex-col">
      <div
        ref={chatContainer}
        className="flex h-1 grow flex-col gap-6 overflow-y-scroll px-4 py-6 md:gap-8"
      >
        {messages.map((message) => (
          <MessageBox
            key={message.id}
            id={message.id}
            align={message.email === loggedInUser ? "RIGHT" : "LEFT"}
            email={message.email}
            sentTime={message.sentTime}
            receivedTime={message.receivedTime}
            messageText={message.messageText}
          />
        ))}
      </div>
      <div className="flex h-[4.5rem] flex-col-reverse items-center justify-between gap-2 px-4 py-2 lg:h-[5.25rem] lg:flex-row lg:gap-4 lg:py-4">
        <div className="relative w-full">
          <textarea
            rows={1}
            placeholder="Message..."
            className="flex w-full grow resize-none rounded-lg bg-gray-200 px-2 py-3 pl-4 pr-14 text-lg shadow-black outline-none duration-200 ease-in-out hover:shadow-md focus:shadow-md dark:bg-gray-750 md:text-xl"
          />
          <div className="absolute right-2 top-1/2 z-10 block -translate-y-1/2 cursor-pointer rounded-full bg-purple-300 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-purple-500 hover:text-white">
            <SendMessageIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
