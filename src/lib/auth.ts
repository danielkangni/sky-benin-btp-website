import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { rateLimit } from './rate-limit';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin/login' },
  trustHost: true,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        if (!rateLimit(`login:${email.toLowerCase()}`, 5, 15 * 60 * 1000)) {
          throw new Error('Trop de tentatives, réessayez dans 15 minutes.');
        }

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return null;

        const ok = await bcrypt.compare(password, admin.password);
        if (!ok) return null;

        return { id: admin.id, email: admin.email, name: admin.name ?? 'Admin' };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as { id: string }).id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
