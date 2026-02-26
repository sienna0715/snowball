"use server";
// import { promises as fs } from "fs";
// import path from "path";
import { client } from "../../studio-hello-world/src/sanity/client";
import { getCookieHeader } from "@/lib/cookies";
import { getMe } from "@/lib/user";
import { ApiError } from "@/lib/api";
import { redirect } from "next/navigation";

type User = {
    userId: string;
    email?: string | null;
};

async function requireUser(): Promise<User> {
    const cookieHeader = await getCookieHeader();
    let user;

    try {
        user = await getMe({ cookie: cookieHeader });
    } catch (e) {
        if (e instanceof ApiError && e.status === 401) {
            redirect("/auth");
        }
        throw e;
    }

    if (!user?.id) return redirect("/auth");

    return {
        userId: String(user.id),
        email: user.email ?? null,
    };
}

export async function getCoverletters(limit = 100) {
    const user = await requireUser();

    const coverletters = await client.fetch(
        `*[_type=="coverletter" && userId == $userId]
      | order(_createdAt desc)[0...$limit]{
        _id, slug, date, title, company, content
      }`,
        { userId: user.userId, limit },
    );

    return coverletters;
}

export async function getCoverletter(slug: string) {
    const user = await requireUser();

    const coverletter = await client.fetch(
        `*[_type=="coverletter" && slug.current==$slug && userId == $userId][0]{
      _id, slug, date, title, company, content
    }`,
        { slug, userId: user.userId },
    );

    return coverletter ?? undefined;
}
