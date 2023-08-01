import prismadb from "@/lib/prismaDb";
import { FC } from "react";
import CompanionForm from "./components/CompanionForm";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface pageProps {
  params: {
    companionId: string;
  };
}

const page: FC<pageProps> = async ({ params }: pageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  //todo check subscription

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userID: userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default page;
