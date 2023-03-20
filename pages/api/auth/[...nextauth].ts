import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "../../../lib/prismadb";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        //check if all fields are provided.
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        // look up the user from the credentials supplied
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        //If no user found
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }
        //user found and correct password
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );
        //If incorrect password.
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
