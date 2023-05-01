import { type NextApiRequest, type NextApiResponse } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID ?? '',
      clientSecret: process.env.APPLE_PRIVATE_KEY ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account?.access_token != null) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      return { ...session, access_token: token.access_token };
    }
  }
};

export const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  NextAuth(req, res, options);
};
