import z from "zod";
declare const SessionPayloadSchema: z.ZodObject<{
    userId: z.ZodNumber;
}, z.z.core.$strip>;
export type SessionPayload = z.infer<typeof SessionPayloadSchema>;
export declare function signSession(payload: SessionPayload): Promise<string>;
export declare function verifySession(token: string): Promise<SessionPayload>;
export {};
//# sourceMappingURL=session.d.ts.map