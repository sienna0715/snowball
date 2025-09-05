"use server";

// import path from "path";
// import { promises as fs } from 'fs';
import { client } from "../../studio-hello-world/src/sanity/client";
import { auth } from "../../auth";
import { redirect } from "next/navigation";

// export async function getJobs(): Promise<Job[]> {
//     const filePath = path.join(process.cwd(), "data", "applications.json");

//     return await fs
//         .readFile(filePath, "utf-8")
//         .then<Job[]>(JSON.parse)
//         .then((datas) => datas.sort((a, b) => (a.date > b.date ? -1 : 1)));
// }

// export async function getJob(id: string): Promise<Job | undefined> {
//     const applications = await getJobs();
//     return applications.find((app) => app.id == id);
// }

// 세션 → user._id → _id match로 내 Job만 GROQ 조회
export async function getJobs(limit = 100) {
    // 1) 로그인 확인
    const session = await auth();
    if (!session?.user?.email) redirect("/auth/signin");

    // 2) 내 user 문서 _id
    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session!.user!.email }
    );
    if (!owner?._id) return [];

    // 3) 내 Job만 가져오는 GROQ
    const jobs = await client.fetch(
        `*[_type=="job" && references($ownerId)]
        | order(_createdAt desc)[0...$limit]{
            _id, slug, company, url, location, introduce, industry, year, employees, ceo,
            employmentType, workLocation, salary, other, _createdAt, deadline, status
        }`,
        { ownerId: owner._id, limit }
    );

    // console.log("[auth] email", session?.user?.email);

    return jobs;
}

// _id match에 owner 기반 접두사를 써서 “내 Job만” 필터링한다.
// 추후 스키마에 owner reference 필드를 추가하면 references($ownerId)로 더 명시적으로 바꾸기

// 단일 Job 조회 (로그인한 유저 소유만 허용)
export async function getJob(slug: string) {
    const session = await auth();
    if (!session?.user?.email) redirect("/auth/signin");

    const owner = await client.fetch<{ _id: string } | null>(
        `*[_type == "user" && email == $email][0]{ _id }`,
        { email: session!.user!.email }
    );
    if (!owner?._id) return [];

    const job = await client.fetch(
        `*[_type=="job" && slug.current==$slug && references($ownerId)][0]{
        _id, slug, company, url, location, introduce, industry, year, employees, ceo,
        employmentType, workLocation, salary, other, _createdAt, deadline, status
        }`,
        { slug, ownerId: owner._id }
    );

    return job ?? undefined;
}
