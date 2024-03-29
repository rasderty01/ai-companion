import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

const page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="h-full p-4 space-y-2">
      <h3 className="text-lg">Settings</h3>
      <div className="text-muted-foreground text-sm">
        {isPro
          ? "You are currently on a Pro plan."
          : "You are currently on a Free plan."}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};

export default page;
