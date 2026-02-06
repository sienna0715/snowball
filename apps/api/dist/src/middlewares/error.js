import { HttpError } from "../utils/error.js";
export function errorMiddleware(err, _req, res, _next) {
    // 기본값
    let status = 500;
    let message = "Internal Server Error";
    let details = undefined;
    if (err instanceof HttpError) {
        status = err.status;
        message = err.message;
        details = err.details;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    return res.status(status).json({
        ok: false,
        error: { message, details },
    });
}
//# sourceMappingURL=error.js.map