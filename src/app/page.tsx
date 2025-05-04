"use client";
import { Button } from "~/components/ui/button";
import { User, useAuth } from "../lib/hooks/auth-hook";

export default function Home() {
  const { session } = useAuth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      {session ? (
        <User />
      ) : (
        <a href="/auth/sign-in">Login</a>

      )}


    </div>
  );
}
