"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  // get session data
  const { data: session, status } = useSession();
  // useRouter hook to navigate to the login page
  const router = useRouter();

  //whenever status or router changes, re-check if authenticated and redirect to sign in page
  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("No session found, redirecting to login...");
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>⏳ Loading session...</p>;
  }

  // if authenticated, show the user's name and email
  if (status === "authenticated") {
    return (
      <main className="p-6">
        <h1>Profile</h1>
        <p>Welcome, {session.user.name}!</p>
        <Image
          src={session.user.image}
          alt="User image"
          width={60}
          height={60}
          style={{ borderRadius: "50%" }}
        />
        <p>Email: {session.user.email}</p>
      </main>
    );
  }

  return null;
}
