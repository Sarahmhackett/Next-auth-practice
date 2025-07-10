import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      console.log("Session callback updated:", session);
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn callback triggered:", { user, account, profile });
      return true;
    },
  },
  debug: true,
};

// Pass options into NextAuth handler
const handler = NextAuth(authOptions);

// ✅ Export both handler and authOptions
export { handler as GET, handler as POST };
