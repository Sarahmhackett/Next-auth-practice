import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

const handler = NextAuth({
  // configure next auth to use google provider
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
  // configure next auth to use mongodb adapter to store user data in mongodb
  adapter: MongoDBAdapter(clientPromise),
  // configure next auth to use secret to sign and verify tokens
  secret: process.env.NEXTAUTH_SECRET,
  // use call backs to create a user session and a sign in user
  callbacks: {
    async session({ session, token, user }) {
      console.log("Session callback:", { session, token, user });
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log(" SignIn callback triggered:", { user, account, profile });
      return true;
    },
  },
  debug: true, // logs more to terminal
});

export { handler as GET, handler as POST };
