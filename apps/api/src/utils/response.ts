import type { Response } from "express";

export function success<T>(res: Response, data: T, status = 200) {
    return res.status(status).json({ ok: true, data });
}

export function fail(
    res: Response,
    message: string,
    status = 400,
    details?: unknown,
) {
    return res.status(status).json({ ok: false, error: { message, details } });
}
