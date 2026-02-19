import type { OAuthProfile } from "./providers.js";
export declare function getGoogleAuthUrl(state: string): Promise<string>;
export declare function handleCallback(currentUrl: URL, expectedState: string): Promise<OAuthProfile>;
//# sourceMappingURL=google.d.ts.map