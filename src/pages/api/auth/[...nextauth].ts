import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

const authOptions = {
  secret: process.env.AUTH_SECRET ?? 'seeds.investment',
  providers: [
    GitHubProvider({
      clientId: '57fd83c5e6450c71e544',
      clientSecret: 'f3d10007f21852c618b5278b8a5bae4b047cfabd'
    }),
    GoogleProvider({
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        // '414526331056-r1qjs9l9vlkgt48hqc8eit81dag3paip.apps.googleusercontent.com',
        '1017054068936-3lhdtcmqaebjgtuk04htpj7bo5rqaufr.apps.googleusercontent.com',
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        // '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'
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
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (user !== undefined) {
        token.id = user.id;
      }
      if (account !== undefined) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, user, token }: any) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      return session;
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

export default NextAuth(authOptions);
