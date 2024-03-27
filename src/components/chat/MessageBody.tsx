import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { IoMicOutline } from "react-icons/io5";
import { RiAttachment2 } from "react-icons/ri";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import messageBodyJson from "../../assets/dummy_messages.json";

export type MessageBodyJson = {
  username: string;
  profilePictureUrl: string;
  sentTime: string;
  receivedTime: string;
  messageText: string;
};

export default function MessageBody({ search }: { search: string }) {
  const chatContainer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, []);

  const [messageBody, setMessageBody] =
    useState<MessageBodyJson[]>(messageBodyJson);

  useEffect(() => {
    if (search) {
      const filteredMessageBody = messageBodyJson.filter((message) =>
        message.messageText.toLowerCase().includes(search),
      );
      setMessageBody(filteredMessageBody);
    } else {
      setMessageBody(messageBodyJson);
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
        className="flex h-[calc(100dvh-5.5rem-7.5rem)] grow flex-col gap-6 overflow-y-scroll px-4 py-6 md:gap-8 lg:h-[calc(100dvh-5.5rem-5.25rem)]"
      >
        {messageBody.map((message, index) => (
          <MessageBox
            key={index}
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
            <div className="cursor-pointer rounded-full bg-indigo-300 bg-opacity-50 p-2 text-2xl text-indigo-700 duration-200 ease-in-out hover:bg-opacity-80">
              <HiOutlineEmojiHappy />
            </div>
            <div className="cursor-pointer rounded-full bg-green-300 bg-opacity-50 p-2 text-2xl text-green-700 duration-200 ease-in-out hover:bg-opacity-80">
              <RiAttachment2 />
            </div>
          </div>
          <input
            type="text"
            placeholder="Message..."
            className="z-0 w-full rounded-lg bg-gray-200 px-2 py-3 text-lg shadow-black outline-none duration-200 ease-in-out hover:shadow-md focus:shadow-md md:text-xl lg:pl-28"
          />
          <div className="absolute right-2 top-1/2 z-10 block -translate-y-1/2 cursor-pointer rounded-full bg-purple-300 bg-opacity-50 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-opacity-80">
            <PiPaperPlaneTiltFill />
          </div>
        </div>
        <div className="flex w-full flex-row-reverse justify-between lg:w-auto">
          <IoMicOutline className="h-full w-auto cursor-pointer rounded-full bg-gray-200 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-gray-300" />
          <RiAttachment2 className="h-full w-auto cursor-pointer rounded-full bg-gray-200 p-2 text-2xl text-purple-700 duration-200 ease-in-out hover:bg-gray-300 lg:hidden" />
        </div>
      </div>
    </div>
  );
}