import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDB"

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        await connectDB()
        //check if user already exists
        const currUser = await User.findOne({ email: user.email })
        if (!currUser) {
          const newUser = User.create({
            email: user.email,
            username: user.email.split("@")[0],
          })
          await newUser.save()
        }
        return true
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.username = user.username; // or whatever field you need
      }
      return token;
    },

    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.name = dbUser.username
      return session
    }
  }
})

export { authOptions as GET, authOptions as POST }