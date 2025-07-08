"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  // useSession hook to set the session state and data
  const { data: session, status } = useSession();

  // if it's loading, show loading msg
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log("SESSION: ", session);
  // if session is true, it's authenticated, show the user's name and email
  return (
    <main className="p-6">
      {session ? (
        <>
          <h1>👋 Welcome, {session.user.name}</h1>
          <Image
            src={session.user.image}
            alt="Profile"
            width={50}
            height={50}
            style={{ borderRadius: "50%" }}
          />
          <p>{session.user.email}</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        // if it's not authenticated, show the sign in button
        <>
          <h1>You are not signed in.</h1>
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        </>
      )}
    </main>
  );
}
