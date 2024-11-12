import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvier from 'next-auth/providers/naver';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { label: 'id', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: credentials?.id,
              password: credentials?.password,
            }),
          });

          const user = await res.json();
          console.log(user);
          if (res.ok && user) return user;
          return null;
        } catch (e: any) {
          throw new Error(e);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
    NaverProvier({
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log('user', user);
      if (user.id) return true;
      else return '/login';
    },
    async redirect({ url, baseUrl }) {
      console.log('url', url);
      console.log('baseurl', baseUrl);
      return url.startsWith(baseUrl) ? baseUrl : url;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;

        if (account?.provider !== 'general') {
          try {
            const res = await fetch(`${process.env.BASE_URL}/api/user`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account!.provider,
              }),
            });
            if (res.status === 200) console.log('ok');
          } catch (error) {
            console.error('Failed to post user data:', error);
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.picture;
      session.user.provider = token.provider;
      session.user.accessToken = token.accessToken;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
