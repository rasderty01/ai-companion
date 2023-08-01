"use client";

import { Companion } from "@prisma/client";

import { ChatMessageProps, ChatMessage } from "@/components/ChatMessage";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);

  const [fakeloading, setFakeloading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeloading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeloading}
        src={companion.src}
        Role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          Role={message.Role}
          key={message.content}
          src={companion.src}
          content={message.content}
        />
      ))}
      {isLoading && <ChatMessage Role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
