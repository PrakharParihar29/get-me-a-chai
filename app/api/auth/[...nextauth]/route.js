import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import User from "@/models/User"
import connectDB from "@/db/connectDB"

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'github' || account.provider === 'google') {
        await connectDB();

        try {
          const currUser = await User.findOne({ email: user.email });

          if (!currUser) {
            const newUser = new User({
              email: user.email,
              username: user.email.split("@")[0],
            });

            await newUser.save();
          }
        } catch (err) {
          console.error("Error during user sign-in:", err);
          return false;
        }
      }

      return true;

    },



    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
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