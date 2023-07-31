import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import MobileSideBar from "@/components/MobileSideBar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const NavBar = ({}) => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSideBar />
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade <Sparkles className="h-4 w-4 ml-2 fill-white text-white" />
        </Button>
        <UserButton afterSignOutUrl="/" />
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
