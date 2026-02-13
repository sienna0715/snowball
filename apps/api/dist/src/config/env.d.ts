import { z } from "zod";
declare const EnvSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        development: "development";
        test: "test";
        production: "production";
    }>>;
    HOST_PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    ORIGIN_URL: z.ZodURL;
    JWT_SECRET: z.ZodOptional<z.ZodString>;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    GOOGLE_ID: z.ZodString;
    GOOGLE_SECRET: z.ZodString;
    GOOGLE_REDIRECT_URI: z.ZodURL;
}, z.core.$strip>;
export type Env = z.infer<typeof EnvSchema>;
export declare const env: {
    NODE_ENV: "development" | "test" | "production";
    HOST_PORT: number;
    ORIGIN_URL: string;
    JWT_EXPIRES_IN: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    JWT_SECRET?: string | undefined;
};
export {};
//# sourceMappingURL=env.d.ts.map