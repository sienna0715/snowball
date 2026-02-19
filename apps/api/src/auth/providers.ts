import { HttpError } from "../utils/error.js";
import {
    getGoogleAuthUrl,
    handleCallback as handleGoogleCallback,
} from "./google.js";

export type OAuthProfile = {
    provider: string; // "google" | "kakao" | "github" ...
    providerAccountId: string;
    email?: string;
    name?: string;
    picture?: string;
};

export type OAuthProvider = {
    id: string;
    displayName: string;
    getAuthUrl: (state: string) => Promise<string>;
    handleCallback: (currentUrl: URL, expectedState: string) => Promise<OAuthProfile>;
};

const registry: Record<string, OAuthProvider> = {
    google: {
        id: "google",
        displayName: "Google",
        getAuthUrl: getGoogleAuthUrl,
        handleCallback: handleGoogleCallback,
    },
};

export function getProvider(id: string): OAuthProvider {
    const p = registry[id];
    if (!p) {
        throw new HttpError("Unsupported provider", 400, { provider: id });
    }
    return p;
}

export function listProviders() {
    return Object.values(registry).map((p) => ({
        id: p.id,
        displayName: p.displayName,
    }));
}