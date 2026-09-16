// lib/auth.ts
// NextAuth.js Configuration for single Admin User login

import { prisma } from './db.ts';
import { hashPassword } from '../prisma/seed.ts';

export const authOptions = {
  providers: [
    {
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please enter both username and password.');
        }

        const user = await prisma.adminUser.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error('Invalid username or password.');
        }

        const calculatedHash = hashPassword(credentials.password);
        if (calculatedHash !== user.passwordHash) {
          throw new Error('Invalid username or password.');
        }

        return {
          id: user.id,
          name: user.username,
          role: 'ADMIN',
        };
      },
    },
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-qb-finder-2026',
};
