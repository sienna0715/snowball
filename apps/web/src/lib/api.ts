// src/lib/api.ts
export type ApiOk<T> = { ok: true; data: T };
export type ApiFail = {
    ok: false;
    error: { message: string; details?: unknown };
};
export type ApiResponse<T> = ApiOk<T> | ApiFail;

export type AuthProvider = {
    id: string; // "google" | "kakao" | "github" ...
    displayName: string; // e.g. "Google"
};

export async function fetchAuthProviders(options: ApiFetchOptions = {}) {
    return apiFetch<AuthProvider[]>("/api/auth/providers", {
        method: "GET",
        ...options,
    });
}

export class ApiError extends Error {
    status: number;
    details?: unknown;

    constructor(message: string, status: number, details?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

type ApiFetchOptions = Omit<RequestInit, "headers"> & {
    headers?: Record<string, string>;
    cookie?: string;
};

function mergeHeaders(a?: Record<string, string>, b?: Record<string, string>) {
    return { ...(a ?? {}), ...(b ?? {}) };
}

export async function apiFetch<T>(
    path: string,
    options: ApiFetchOptions = {},
): Promise<T> {
    const { cookie, headers, ...init } = options;
    const isAbsolute = /^https?:\/\//i.test(path);
    const base = process.env.WEB_URL || "";

    const url = isAbsolute
        ? path
        : typeof window === "undefined"
            ? new URL(path, base).toString()
            : path;

    const res = await fetch(url, {
        ...init,
        credentials: "include",
        headers: mergeHeaders(headers, cookie ? { cookie } : undefined),
        cache: "no-store",
    });

    // 서버 응답 {ok, data} 형태
    const json = (await res.json().catch(() => null)) as ApiResponse<T> | null;

    if (!res.ok) {
        const msg =
            (json &&
                "ok" in json &&
                json.ok === false &&
                json.error?.message) ||
            `Request failed (${res.status})`;
        const details =
            json && "ok" in json && json.ok === false
                ? json.error?.details
                : undefined;
        throw new ApiError(msg, res.status, details);
    }

    if (!json) {
        throw new ApiError("Invalid server response", res.status);
    }

    if (json.ok === false) {
        throw new ApiError(
            json.error.message || "Request failed",
            res.status,
            json.error.details,
        );
    }

    return json.data;
}
