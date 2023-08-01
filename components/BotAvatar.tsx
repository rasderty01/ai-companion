import { FC } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface BotAvatarProps {
  src: string;
}

const BotAvatar: FC<BotAvatarProps> = ({ src }: BotAvatarProps) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
