import { apiFetch } from "./api";

export type User = {
    id: number;
    email: string;
    name?: string | null;
    picture?: string | null;
    createdAt?: string;
};

export async function getMe(options?: { cookie?: string }) {
    return apiFetch<User | null>("/api/auth/me", {
        method: "GET",
        cookie: options?.cookie,
    });
}

export async function logout(options?: { cookie?: string }) {
    return apiFetch<null>("/api/auth/logout", {
        method: "POST",
        cookie: options?.cookie,
    });
}
