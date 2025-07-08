"use client";

import { SessionProvider } from "next-auth/react";

// Wraps the whole app and allows any page to access session data
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
