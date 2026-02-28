import { redirect, notFound } from "next/navigation";
import { getCookieHeader } from "@/lib/cookies";
import { getJob } from "@/lib/jobs";
import EditJobForm from "./EditJobForm";

type JobProps = {
    params: { slug: string };
};

export const dynamic = "force-dynamic";

function parseJobId(slug: string) {
    const n = Number(slug);
    if (!Number.isInteger(n) || n <= 0) redirect("/jobs");
    return n;
}

function toClientJob<T>(data: T): T {
    return JSON.parse(JSON.stringify(data)) as T;
}

export default async function EditJobPage({ params }: JobProps) {
    const { slug } = await params;
    const jobId = parseJobId(slug);
    const cookieHeader = await getCookieHeader();

    let job: Awaited<ReturnType<typeof getJob>> | null = null;
    try {
        job = await getJob(jobId, { cookie: cookieHeader });
    } catch {
        job = null;
    }

    if (!job) return notFound();

    const jobForClient = toClientJob(job);

    return <EditJobForm job={jobForClient} />;
}
