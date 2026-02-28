import type { CookieOptions } from "express";

const isProd = process.env.NODE_ENV === "production";

export const cookieOpts: CookieOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/",
};
