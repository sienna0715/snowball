import type { Request, Response, NextFunction } from "express";
import { verifySession } from "../services/session.js";

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const token = req.cookies?.session;
        if (!token) return res.status(401).json({ message: "Unauthorized👿" });

        const session = await verifySession(token);
        req.userId = session.userId;

        next();
    } catch {
        return res.status(401).json({ message: "Unauthorized👿" });
    }
}
// Authorization 헤더의 JWT 검증해서 req.userId 주입

//	idToken 입력 검증(zod)
