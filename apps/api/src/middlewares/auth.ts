import type { Request, Response, NextFunction } from "express";
import { verifySession } from "../services/session.js";
import { cookieOpts } from "../config/cookie.js";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const token = req.cookies?.session;

    if (!token) {
        return res.status(401).json({
            code: "NO_SESSION",
            message: "Unauthorized👿",
        });
    }

    try {
        const session = await verifySession(token);
        req.userId = session.userId;
        return next();
    } catch (err: any) {
        // ✅ jose(jwtVerify) 기준: 만료면 err.code === "ERR_JWT_EXPIRED"
        const isExpired =
            err?.code === "ERR_JWT_EXPIRED" ||
            err?.name === "JWTExpired" ||
            err?.name === "JWTExpiredError";

        if (isExpired) {
            // 🔥 실무 추천: 만료되면 쿠키까지 지워서 클라이언트 상태를 정리
            res.clearCookie("session", cookieOpts);

            return res.status(401).json({
                code: "TOKEN_EXPIRED",
                message: "Session expired",
            });
        }

        // 그 외(서명 불일치/변조/형식 오류 등)
        return res.status(401).json({
            code: "INVALID_SESSION",
            message: "Unauthorized👿",
        });
    }
}
