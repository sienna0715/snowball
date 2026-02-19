import { asyncHandler } from "../utils/asyncHandler.js";
import { authService } from "../services/auth.js";
import { env } from "../config/env.js";
import { HttpError } from "../utils/error.js";
import { listProviders } from "../auth/providers.js";
import { success } from "../utils/response.js";
function requireParam(value, name) {
    if (typeof value !== "string" || value.length === 0) {
        throw new HttpError(`Missing ${name}`, 400);
    }
    return value;
}
export const authController = {
    providers: asyncHandler(async (_req, res) => {
        const data = listProviders();
        return res.json({ ok: true, data });
    }),
    login: asyncHandler(async (req, res) => {
        const provider = requireParam(req.params.provider, "provider");
        const url = await authService.startLogin(provider, res);
        return res.redirect(url.toString?.() ?? String(url));
    }),
    oauth: asyncHandler(async (req, res) => {
        const provider = requireParam(req.params.provider, "provider");
        await authService.finishLogin({ provider, req, res });
        return res.redirect(env.ORIGIN_URL);
    }),
    me: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const user = await authService.getMe(userId);
        return success(res, user);
    }),
    logout: asyncHandler(async (_req, res) => {
        await authService.logout(res);
        return res.sendStatus(204);
    }),
};
//# sourceMappingURL=auth.js.map