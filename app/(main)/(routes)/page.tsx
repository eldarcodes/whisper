import { ThemeModeToggle } from "@/components/theme-toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container py-10">
      <UserButton afterSignOutUrl="/" />

      <ThemeModeToggle />
    </div>
  );
}
