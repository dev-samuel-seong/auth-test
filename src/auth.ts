import NextAuth from "next-auth";
import kakao from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    signIn: async ({ account, profile }) => {
      console.log("account:", account, "profile:", profile);
      return true;
    },
    jwt: async ({ token, user, trigger, session, profile }) => {
      if (user) {
        Object.assign(token, user);
      }
      if (trigger === "update" && session) {
        Object.assign(token, session.user);
        token.picture = session.user.image;
      }
      console.log("token:", token, "profile:", profile);
      return token;
    },
    session: async ({ session, token }) => {
      session = { ...session, ...token };
      console.log("session:", session, "token:", token);
      return session;
    },
  },
});
