export function ok(res, data, status = 200) {
    return res.status(status).json({ ok: true, data });
}
export function fail(res, message, status = 400, details) {
    return res.status(status).json({ ok: false, error: { message, details } });
}
//# sourceMappingURL=response.js.map