import { SignJWT, jwtVerify, errors as JoseErrors } from "jose";
import { env } from "../config/env.js";
import z from "zod";
import { HttpError } from "../utils/error.js";
const secret = new TextEncoder().encode(env.JWT_SECRET ?? "");
if (secret.length < 32) {
    throw new Error("JWT_SECRET is too short. Use at least 32 bytes of entropy.");
}
const SessionPayloadSchema = z.object({
    userId: z.number().int().positive(),
});
export async function signSession(payload) {
    const data = SessionPayloadSchema.parse(payload);
    return await new SignJWT(data)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setIssuedAt()
        .setExpirationTime(env.JWT_EXPIRES_IN)
        .sign(secret);
}
export async function verifySession(token) {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ["HS256"],
        });
        return SessionPayloadSchema.parse(payload);
    }
    catch {
        throw new HttpError("Invalid or expired session.", 401);
    }
}
//# sourceMappingURL=session.js.map