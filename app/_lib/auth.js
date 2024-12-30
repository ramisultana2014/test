import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  // in providers we can also use github, facebook
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // this  callback run with middleware.js
  // // we protect route /account in middleware.js , when we reach this router this authorized function  run and check if there is user or not , if not it redirect us to pages: {
  //   signIn: "/login",
  // },
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // here we return true or false
    },
    // now this signIn function run when we reach protect route and need to  signin with google, it have access to (user account,profile), check if there i user in data base with getGuest() , if not we create one
    async signIn({ user, account, profile }) {
      try {
        const exisitingGuest = await getGuest(user.email);

        if (!exisitingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    // this session function very important , it will add the id from our database to the session object(const session = await auth();) which we use in many  places like Session for logged in user,protected component for only logged in users
    // look at Session for logged in user to ***important notice****
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  //pages will redirect unlogged  user when we reach protect router /account  to our page.js inside login folder instead of default provided by google
  pages: {
    signIn: "/login",
  },
};
export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
// auth function we call it in any server component like in Navigation.js
//auth for session
//signIn we will used with page.js inside folder login with SignInButton.js
