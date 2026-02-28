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

function safeParseApiResponse<T>(text: string): ApiResponse<T> | null {
    if (!text) return null;
    try {
        return JSON.parse(text) as ApiResponse<T>;
    } catch {
        return null;
    }
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

    let res: Response;
    try {
        res = await fetch(url, {
            ...init,
            credentials: "include",
            headers: mergeHeaders(headers, cookie ? { cookie } : undefined),
            cache: "no-store",
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : "Network error";
        throw new ApiError(message, 0);
    }

    // 204 No Content (e.g. DELETE success)
    if (res.status === 204) {
        return undefined as T;
    }

    const text = await res.text();
    // 서버 응답은 원칙적으로 { ok, data } 형태지만,
    // 런타임/프록시 에러로 일반 텍스트가 올 수도 있음
    const json = safeParseApiResponse<T>(text);

    if (!res.ok) {
        const msg =
            (json?.ok === false && json.error?.message) ||
            (text
                ? text.trim().slice(0, 200)
                : `Request failed (${res.status})`);
        const details = json?.ok === false ? json.error?.details : undefined;
        throw new ApiError(msg, res.status, details);
    }

    if (!json) {
        // 일부 성공 응답은 바디가 비어있거나(text) JSON이 아닐 수 있음
        // (예: DELETE 성공, 프록시가 빈 바디를 반환)
        return undefined as T;
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
