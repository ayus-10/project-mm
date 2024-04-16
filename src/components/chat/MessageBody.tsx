import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { IoMicOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import messageBodyArray from "../../assets/dummy_messages.json";

export type MessageBodyArray = {
  id: string;
  username: string;
  profilePictureUrl: string;
  sentTime: string;
  receivedTime: string;
  messageText: string;
};

export default function MessageBody({ search }: { search: string }) {
  const chatContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll down to bottom most message
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, []);

  const [messageBody, setMessageBody] =
    useState<MessageBodyArray[]>(messageBodyArray);

  useEffect(() => {
    // Filter the message body array based on the value of search
    if (search) {
      const filteredMessageBody = messageBodyArray.filter((message) =>
        message.messageText.toLowerCase().includes(search),
      );
      setMessageBody(filteredMessageBody);
    } else {
      setMessageBody(messageBodyArray);
    }
  }, [search]);

  const loggedInUser = {
    username: "The Boss",
    profilePictureUrl:
      "https://cdn.discordapp.com/avatars/986940340227432450/0a631fa4969b98de989be153d20e689f.webp?size=100",
  };

  return (
    <div className="flex grow flex-col">
      <div
        ref={chatContainer}
        className="flex h-1 grow flex-col gap-6 overflow-y-scroll px-4 py-6 md:gap-8"
      >
        {messageBody.map((message) => (
          <MessageBox
            key={message.id}
            id={message.id}
            align={
              message.username === loggedInUser.username ? "right" : "left"
            }
            username={message.username}
            profilePictureUrl={message.profilePictureUrl}
            sentTime={message.sentTime}
            receivedTime={message.receivedTime}
            messageText={message.messageText}
          />
        ))}
      </div>
      <div className="flex h-[7.5rem] flex-col-reverse items-center justify-between gap-2 px-4 py-2 lg:h-[5.25rem] lg:flex-row lg:gap-4 lg:py-4">
        <div className="relative w-full">
          <div className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 gap-2 lg:flex">
            <div className="cursor-pointer rounded-full bg-indigo-300 p-2 text-2xl text-indigo-700 duration-200 ease-in-out hover:bg-indigo-500 hover:text-white">
              <HiOutlineEmojiHappy />
            </div>
            <div className="cursor-pointer rounded-full bg-green-300 p-2 text-2xl text-green-700 duration-200 ease-in-out hover:bg-green-500 hover:text-white">
              <RiAttachment2 />
            </div>
          </div>
          <textarea
            rows={1}
            placeholder="Message..."
            className="flex w-full grow resize-none rounded-lg bg-gray-200 px-2 py-3 pr-14 text-lg shadow-black outline-none duration-200 ease-in-out hover:shadow-md focus:shadow-md dark:bg-gray-750 md:text-xl lg:pl-28"
          ></textarea>
          <div className="absolute right-2 top-1/2 z-10 block -translate-y-1/2 cursor-pointer rounded-full bg-purple-300 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-purple-500 hover:text-white">
            <PiPaperPlaneTiltFill />
          </div>
        </div>
        <div className="flex w-full flex-row-reverse justify-between lg:w-auto">
          <IoMicOutline className="h-full w-auto cursor-pointer rounded-full bg-blue-300 p-2 text-2xl text-blue-700 duration-200 ease-in-out hover:bg-blue-500 hover:text-white" />
          <RiAttachment2 className="h-full w-auto cursor-pointer rounded-full bg-green-300 p-2 text-2xl text-green-700 duration-200 ease-in-out hover:bg-green-500 hover:text-white lg:hidden" />
        </div>
      </div>
    </div>
  );
}
