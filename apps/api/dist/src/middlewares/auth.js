import { verifySession } from "../services/session.js";
export async function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.session;
        if (!token)
            return res.status(401).json({ message: "Unauthorized👿" });
        const session = await verifySession(token);
        req.userId = session.userId;
        next();
    }
    catch {
        return res.status(401).json({ message: "Unauthorized👿" });
    }
}
//# sourceMappingURL=auth.js.map