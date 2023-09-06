import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-10">
      <p className="text-3xl font-bold text-indigo-500 mb-2">Whisper</p>

      <div className="flex gap-3">
        <Link href="/register">
          <Button variant="default">Sign up</Button>
        </Link>

        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}
