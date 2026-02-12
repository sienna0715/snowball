import type { RequestHandler } from "express";
import type { z } from "zod";
import { parse } from "../utils/parse.js";

/**
 * router.post("/", validateBody(schema), controller)
 */
export function validateBody<T extends z.ZodTypeAny>(
    schema: T,
    message = "Invalid request body",
): RequestHandler {
    return (req, _res, next) => {
        req.body = parse(schema, req.body, message);
        next();
    };
}

/**
 * 라우트: router.get("/:jobId", validateParams(schema), controller)
 */
export function validateParams<T extends z.ZodTypeAny>(
    schema: T,
    message = "Invalid route params",
): RequestHandler {
    return (req, res, next) => {
        res.locals.params = parse(schema, req.params, message);
        next();
    };
}

/**
 * 라우트: router.get("/", validateQuery(schema), controller)
 */
export function validateQuery<T extends z.ZodTypeAny>(
    schema: T,
    message = "Invalid query string",
): RequestHandler {
    return (req, res, next) => {
        res.locals.query = parse(schema, req.query, message);
        next();
    };
}
