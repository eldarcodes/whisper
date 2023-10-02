import { redirect } from "next/navigation";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerHeader } from "@/components/server/server-header";
import { ServerSearch } from "@/components/server/server-search";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServerSidebarProps {
  serverId: string;
}

const icons: Record<ChannelType, React.ReactNode> = {
  TEXT: <Hash className="mr-2 w-4 h-4" />,
  AUDIO: <Mic className="mr-2 w-4 h-4" />,
  VIDEO: <Video className="mr-2 w-4 h-4" />,
};

const roleIcons: Record<MemberRole, React.ReactNode> = {
  ADMIN: <ShieldAlert className="mr-2 text-rose-500 w-4 h-4" />,
  MODERATOR: <ShieldCheck className="mr-2 text-indigo-500 w-4 h-4" />,
  GUEST: null,
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const textChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = server.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader server={server} role={role} />

      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                })),
              },

              {
                label: "Voice channels",
                type: "channel",
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                })),
              },

              {
                label: "Video channels",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: icons[channel.type],
                })),
              },

              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIcons[member.role],
                })),
              },
            ]}
          />
        </div>
      </ScrollArea>
    </div>
  );
};
