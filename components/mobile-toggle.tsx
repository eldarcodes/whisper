import { Menu, X } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSidebar } from "@/components/server/server-sidebar";

export const MobileToggle = ({ serverId }: { serverId: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="p-0 flex gap-0 max-w-[350px] w-full"
        showCloseButton={false}
      >
        <div className="w-[72px]">
          <NavigationSidebar />
        </div>

        <SheetClose className="absolute top-0 right-0">
          <Button variant="ghost" size="icon" className="size-5 md:hidden h-12">
            <X style={{ width: 20, height: 20 }} />
          </Button>
        </SheetClose>

        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};
