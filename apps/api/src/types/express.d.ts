// src/types/express.d.ts
import "express";

declare module "express-serve-static-core" {
    interface Request {
        userId?: number;
    }

    interface Response {
        locals: {
            validated?: {
                body?: unknown;
                params?: unknown;
                query?: unknown;
            };
        };
    }
}
