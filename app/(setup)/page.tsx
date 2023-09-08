import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { Button } from "@/components/ui/button";

const SetupPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: { profileId: profile.id },
      },
    },
  });

  if (server) {
    return redirect(`/server/${server.id}`);
  }

  return <Button>Create a Server</Button>;
};

export default SetupPage;
