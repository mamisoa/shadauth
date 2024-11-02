import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { User } from "@prisma/client";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";

// Define custom user type for auth
type AuthUser = Omit<User, "password"> & {
	error?: string;
};

export const authConfig: NextAuthConfig = {
	trustHost: true,
	adapter: PrismaAdapter(prisma),
	secret: process.env.AUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	pages: {
		signIn: "/auth/sign-in",
		error: "/auth/error",
	},

	providers: [
		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "••••••••",
				},
			},
			async authorize(credentials): Promise<AuthUser | null> {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Missing credentials");
				}

				try {
					const user = await prisma.user.findUnique({
						where: {
							email: credentials.email as string,
						},
						select: {
							id: true,
							email: true,
							password: true,
							username: true,
							firstname: true,
							lastname: true,
							name: true,
							role: true,
							emailVerified: true,
							image: true,
							createdAt: true,
							updatedAt: true,
						},
					});

					if (!user?.password) {
						throw new Error("Invalid credentials");
					}

					const isValidPassword = await bcrypt.compare(
						credentials.password as string,
						user.password
					);

					if (!isValidPassword) {
						throw new Error("Invalid credentials");
					}

					// Return user without password
					return user as AuthUser;
				} catch (error) {
					console.error("Authentication error:", error);
					return null;
				}
			},
		}),
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			allowDangerousEmailAccountLinking: true,
		}),
		Nodemailer({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: parseInt(process.env.EMAIL_SERVER_PORT!, 10),
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
