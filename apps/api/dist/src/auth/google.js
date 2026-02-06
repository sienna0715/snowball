import * as oidc from "openid-client";
import { env } from "../config/env.js";
import { HttpError } from "../utils/error.js";
let googleConfig = null;
async function getGoogleConfig() {
    if (googleConfig)
        return googleConfig;
    googleConfig = await oidc.discovery(new URL("https://accounts.google.com"), env.GOOGLE_ID, env.GOOGLE_SECRET);
    return googleConfig;
}
export async function getGoogleAuthUrl(state) {
    const config = await getGoogleConfig();
    const url = oidc.buildAuthorizationUrl(config, {
        redirect_uri: env.GOOGLE_REDIRECT_URI,
        scope: "openid email profile",
        state,
    });
    return url.toString();
}
export async function handleCallback(currentUrl, expectedState) {
    const config = await getGoogleConfig();
    // code → token 교환
    let tokens;
    try {
        // code → token 교환 + state 검증(expectedState)
        tokens = await oidc.authorizationCodeGrant(config, currentUrl, {
            expectedState,
        });
    }
    catch (err) {
        // state 불일치나 grant 실패 등: 인증 흐름 자체가 유효하지 않음
        throw new HttpError("Invalid OAuth callback request.", 401, {
            cause: err,
        });
    }
    const accessToken = tokens.access_token;
    if (!accessToken) {
        throw new HttpError("Token response missing access_token.", 401);
    }
    const subject = tokens.claims()?.sub;
    if (!subject) {
        throw new HttpError("Missing ID Token subject (sub). Make sure scope includes 'openid'.", 401);
    }
    let userInfo;
    try {
        userInfo = await oidc.fetchUserInfo(config, accessToken, subject);
    }
    catch (err) {
        throw new HttpError("Failed to fetch user profile from Google.", 502, {
            cause: err,
        });
    }
    return {
        provider: "google",
        providerAccountId: String(userInfo.sub),
        ...(typeof userInfo.email === "string"
            ? { email: userInfo.email }
            : {}),
        ...(typeof userInfo.name === "string" ? { name: userInfo.name } : {}),
        ...(typeof userInfo.picture === "string"
            ? { picture: userInfo.picture }
            : {}),
    };
}
//# sourceMappingURL=google.js.map