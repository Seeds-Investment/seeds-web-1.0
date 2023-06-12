import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { type Session, type TokenSet } from 'next-auth';
import AppleProvider from 'next-auth/providers/apple';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const options = {
  secret: process.env.AUTH_SECRET ?? '',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID ?? '',
      clientSecret: process.env.APPLE_CLIENT_SECRET ?? ''
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (typeof account?.access_token === 'string') {
        token.access_token =
          account.provider === 'apple'
            ? account.id_token
            : account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: TokenSet }) {
      // Send properties to the client, like an access_token from a provider.
      return {
        ...session,
        access_token: token.access_token,
        provider: token.provider
      };
    }
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return NextAuth(req, res, options);
}
