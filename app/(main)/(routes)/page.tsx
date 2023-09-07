import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="container py-10">
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
