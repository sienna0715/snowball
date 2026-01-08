"use server"
// import { promises as fs } from "fs";
// import path from "path";
import { client } from "../../studio-hello-world/src/sanity/client";
import { auth } from "../../middleware/auth";
import { redirect } from "next/navigation";

// export type Coverletter = {
//     date: Date;
//     title: "string";
//     target: "string";
// }

// export async function getCoverletter(): Promise<Coverletter[]> {
//     const filePath = path.join(process.cwd(), 'data', 'coverletter.json');

//     return await fs.readFile(filePath, 'utf-8')
//     .then<Coverletter[]>(JSON.parse)
//     .then(datas => datas.sort((a, b) => (a.date > b.date) ? -1 : 1));
// } 

export async function getCoverletters(limit = 100) {
    const session = await auth();
    if (!session?.user?.email) redirect("/auth/signin");

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session!.user!.email }
    );
    if (!owner?._id) return [];

    const coverletters = await client.fetch(
        `*[_type=="coverletter" && references($ownerId)]
        | order(_createdAt desc)[0...$limit]{
            _id, slug, date, title, company, content
        }`,
        { ownerId: owner._id, limit }
    );

    return coverletters;
}

export async function getCoverletter(slug: string) {
    const session = await auth();
    if (!session?.user?.email) redirect("/auth/signin");

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session!.user!.email }
    );
    if (!owner?._id) return [];

    const coverletter = await client.fetch(
        `*[_type=="coverletter" && slug.current==$slug && references($ownerId)][0]{
        _id, slug, date, title, company, content
        }`,
        { slug, ownerId: owner._id }
    );

    return coverletter ?? undefined;
}