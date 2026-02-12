import type { RequestHandler } from "express";
import type { z } from "zod";
/**
 * router.post("/", validateBody(schema), controller)
 */
export declare function validateBody<T extends z.ZodTypeAny>(schema: T, message?: string): RequestHandler;
/**
 * 라우트: router.get("/:jobId", validateParams(schema), controller)
 */
export declare function validateParams<T extends z.ZodTypeAny>(schema: T, message?: string): RequestHandler;
/**
 * 라우트: router.get("/", validateQuery(schema), controller)
 */
export declare function validateQuery<T extends z.ZodTypeAny>(schema: T, message?: string): RequestHandler;
//# sourceMappingURL=validate.d.ts.map