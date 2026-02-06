import "dotenv/config";
import { z } from "zod";
const EnvSchema = z
    .object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    HOST_PORT: z.coerce.number().int().positive().default(8081),
    ORIGIN_URL: z.url({
        message: "ORIGIN_URL must be a valid URL",
    }),
    // JWT
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required").optional(),
    JWT_EXPIRES_IN: z.string().min(1).default("15m"),
    // Google
    GOOGLE_ID: z.string().min(1, "GOOGLE_ID is required"),
    GOOGLE_SECRET: z.string().min(1, "GOOGLE_SECRET is required"),
    GOOGLE_REDIRECT_URI: z.url({
        message: "GOOGLE_REDIRECT_URI must be a valid URL",
    }),
})
    .superRefine((val, ctx) => {
    if (val.NODE_ENV === "production" && !val.JWT_SECRET) {
        ctx.addIssue({
            code: "custom",
            path: ["JWT_SECRET"],
            message: "JWT_SECRET is required in production",
        });
    }
});
export const env = EnvSchema.parse(process.env);
//# sourceMappingURL=env.js.map