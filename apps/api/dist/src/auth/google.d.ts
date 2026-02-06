export type OAuthProfile = {
    provider: "google";
    providerAccountId: string;
    email?: string;
    name?: string;
    picture?: string;
};
export declare function getGoogleAuthUrl(state: string): Promise<string>;
export declare function handleCallback(currentUrl: URL, expectedState: string): Promise<OAuthProfile>;
//# sourceMappingURL=google.d.ts.map