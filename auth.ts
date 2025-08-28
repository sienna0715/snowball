import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";

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
        signIn: async () => {
            return true;
        },
        // jwt: async ({ token, user }) => {
        //     return token;
        // },
        // session: async ({ session, token }) => {
        //     return session;
        // },
    },
});
