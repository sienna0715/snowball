import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import addUser from "./studio-hello-world/src/sanity/user";

// Extend the Session and User types to include 'username'
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: DefaultSession["user"] & { username?: string };
    }
}

const providers: Provider[] = [
    Credentials({
        credentials: { password: { label: "Password", type: "password" } },
        authorize(c) {
            if (c.password !== "password") return null;
            return {
                id: "test",
                name: "Test User",
                email: "test@example.com",
            };
        },
    }),
    Google,
];

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider();
            return { id: providerData.id, name: providerData.name };
        } else {
            return { id: provider.id, name: provider.name };
        }
    })
    .filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    // session: {
    //     strategy: "jwt", // JSON Web Token 사용
    //     maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
    // },
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            const payload = {
                id: account?.providerAccountId ?? user.id ?? "",
                name: user.name || "",
                email: user.email!,
                image: user.image || "",
                username: user.email!.split("@")[0],
                provider: account?.provider,
                providerAccountId: account?.providerAccountId,
            };
            // console.log("[auth] addUser payload:", payload); // 시작 로그

            try {
                await addUser(payload);
                // console.log("[auth] addUser done"); // 완료 로그
                return true;
            } catch (e) {
                console.error("Add User failed", e); // 실패 로그
                return true;
            }
        },
        // jwt: async ({ token, user }) => {
        //     return token;
        // },
        session: async ({ session }) => {
            console.log("session", session);

            const user = session?.user;

            if (user) {
                session.user = {
                    ...user,
                    username: user.email?.split("@")[0] || "",
                };
            }
            return session;
        },
    },
});
