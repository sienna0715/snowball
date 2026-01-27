import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/error.js";

export function errorMiddleware(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) {
    // 기본값
    let status = 500;
    let message = "Internal Server Error";
    let details: unknown = undefined;

    if (err instanceof HttpError) {
        status = err.status;
        message = err.message;
        details = err.details;
    } else if (err instanceof Error) {
        message = err.message;
    }

    return res.status(status).json({
        ok: false,
        error: { message, details },
    });
}
