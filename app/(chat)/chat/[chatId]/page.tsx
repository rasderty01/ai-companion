import prismadb from "@/lib/prismaDb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FC } from "react";
import ChatClient from "./components/client";

interface pageProps {
  params: {
    chatId: string;
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },

        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default page;
