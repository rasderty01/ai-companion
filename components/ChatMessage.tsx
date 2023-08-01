"use client";

import { FC } from "react";
import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import BotAvatar from "./BotAvatar";
import { BeatLoader } from "react-spinners";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatMessage = ({ role, content, isLoading, src }: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Copied to clipboard",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center w-full gap-x-3 py-4",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
