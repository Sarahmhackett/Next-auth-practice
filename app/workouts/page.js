"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AddExerciseForm from "@/components/AddExerciseForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No session found, redirecting to login...");
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>⏳ Loading session...</p>;
  }
  console.log("session:", session);
  console.log("session.user:", session?.user);
  console.log("session.user.id:", session?.user?.id);
  console.log(session);

  if (status === "authenticated") {
    return (
      <main className="container">
        <h1>workouts</h1>
        <p>Hey, {session.user.name}!</p>

        {/* table here to show workouts */}
        <AddExerciseForm userId={session?.user?.id} />
      </main>
    );
  }

  return null;
}
