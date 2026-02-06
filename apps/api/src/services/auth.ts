// Runtime
import type { Request, Response } from "express";
import crypto from "crypto";
import { env } from "../config/env.js";

// Infrastructure
import { prisma } from "../db/prisma.js";
import { signSession } from "./session.js";

// Errors
import { HttpError } from "../utils/error.js";

// Auth
import {
    getGoogleAuthUrl,
    handleCallback,
    type OAuthProfile,
} from "../auth/google.js";

const cookieOpts = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.NODE_ENV === "production",
};

function newState() {
    return crypto.randomBytes(16).toString("hex");
}

const providers = {
    google: {
        getAuthUrl: getGoogleAuthUrl,
        handleCallback,
    },
} as const;

type Provider = keyof typeof providers;

function asProvider(p: string): Provider {
    if (!Object.prototype.hasOwnProperty.call(providers, p)) {
        throw new HttpError("Unsupported provider", 400);
    }
    return p as Provider;
}

async function createUser(profile: OAuthProfile) {
    const { provider, providerAccountId, email, name, picture } = profile;

    const account = await prisma.account.findUnique({
        where: { provider_providerAccountId: { provider, providerAccountId } },
        include: { user: true },
    });
    if (account) return account.user;

    if (!email) {
        throw new HttpError("Email is required by current schema.", 400);
    }

    return prisma.$transaction(async (tx) => {
        const user =
            (await tx.user.findUnique({ where: { email } })) ??
            (await tx.user.create({
                data: {
                    email,
                    name: name ?? null,
                    picture: picture ?? null,
                },
            }));

        try {
            await tx.account.create({
                data: { provider, providerAccountId, userId: user.id },
            });
        } catch {
            const existing = await tx.account.findUnique({
                where: {
                    provider_providerAccountId: { provider, providerAccountId },
                },
                include: { user: true },
            });
            if (existing) return existing.user;
            throw new HttpError("Failed to link OAuth account.", 500);
        }

        return user;
    });
}

export const authService = {
    async startLogin(providerRaw: string, res: Response) {
        const provider = asProvider(providerRaw);

        const state = newState();
        res.cookie("oauth_state", state, {
            ...cookieOpts,
            maxAge: 5 * 60 * 1000,
        });

        return providers[provider].getAuthUrl(state);
    },

    async finishLogin(args: { provider: string; req: Request; res: Response }) {
        const { req, res } = args;
        const provider = asProvider(args.provider);

        const savedState = req.cookies?.oauth_state;
        const state =
            typeof req.query.state === "string" ? req.query.state : undefined;

        if (!savedState || !state || savedState !== state) {
            throw new HttpError("Invalid state", 401);
        }
        res.clearCookie("oauth_state");

        const origin = `${req.protocol}://${req.get("host")}`;
        const currentUrl = new URL(req.originalUrl, origin);

        const profile = await providers[provider].handleCallback(
            currentUrl,
            savedState,
        );
        const user = await createUser(profile);

        const sessionToken = await signSession({ userId: user.id });
        res.cookie("session", sessionToken, {
            ...cookieOpts,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return user;
    },

    async getMe(userId: number) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                picture: true,
                createdAt: true,
            },
        });
    },

    async logout(res: Response) {
        res.clearCookie("session", cookieOpts);
    },
};
