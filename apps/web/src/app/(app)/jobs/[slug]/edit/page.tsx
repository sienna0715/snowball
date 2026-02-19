import { redirect, notFound } from "next/navigation";
import { getCookieHeader } from "@/lib/cookies";
import { getJob } from "@/lib/jobs";
import { updateJobAction } from "../../actions";
import EditJobForm from "./EditJobForm";

type JobProps = {
    params: { slug: string };
};

export const dynamic = "force-dynamic";

function parseJobId(slug: string) {
    const n = Number(slug);
    if (!Number.isInteger(n) || n <= 0) return null;
    return n;
}

export default async function EditJobPage({ params }: JobProps) {
    const { slug } = params;
    const jobId = parseJobId(slug);
    if (!jobId) redirect("/jobs");

    const cookieHeader = await getCookieHeader();

    let job: Awaited<ReturnType<typeof getJob>> | null = null;
    try {
        job = await getJob(jobId, { cookie: cookieHeader });
    } catch {
        job = null;
    }

    if (!job) notFound();

    return (
        <EditJobForm job={job} onSubmit={updateJobAction.bind(null, job.id)} />
    );
}
