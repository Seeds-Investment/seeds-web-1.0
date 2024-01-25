import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  secret: process.env.AUTH_SECRET ?? 'seeds.investment',
  providers: [
    GitHubProvider({
      clientId: 'af6f5c38dce1c19687fa',
      clientSecret: 'a0721294fa662a91eac9eb5e10ff89a8791f8e7f'
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        '1017054068936-3lhdtcmqaebjgtuk04htpj7bo5rqaufr.apps.googleusercontent.com',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        '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'
    })
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID ?? '',
    //   clientSecret: process.env.APPLE_CLIENT_SECRET ?? ''
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? ''
    // })
  ]
  // callbacks: {
  //   async jwt({ token, user, account, profile, isNewUser }: any) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (typeof account?.access_token === 'string') {
  //       token.access_token =
  //         account.provider === 'apple'
  //           ? account.id_token
  //           : account.access_token;
  //       token.provider = account.provider;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }: any) {
  //     // Send properties to the client, like an access_token from a provider.
  //     return {
  //       ...session,
  //       access_token: token.access_token,
  //       provider: token.provider
  //     };
  //   }
  // },
  // cookies: {
  //   pkceCodeVerifier: {
  //     name: 'next-auth.pkce.code_verifier',
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'none',
  //       path: '/',
  //       secure: true
  //     }
  //   }
  // }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  return NextAuth(req, res, authOptions);
}
