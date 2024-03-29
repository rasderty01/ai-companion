"use client";
import ChatHeader from "@/components/ChatHeader";
import { useCompletion } from "ai/react";
import { Companion, Message } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import ChatForm from "@/components/ChatForm";
import ChatMessages from "@/components/ChatMessages";
import { ChatMessageProps } from "@/components/ChatMessage";

interface clientProps {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatClient = ({ companion }: clientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(
    companion.messages
  );

  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          Role: "system",
          content: completion,
        };

        setMessages((current) => [...current, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      Role: "user",
      content: input,
    };
    setMessages((current) => [...current, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className=" flex flex-col h-full p-4 space-y-2">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        handleInputChange={handleInputChange}
        input={input}
      />
    </div>
  );
};

export default ChatClient;
