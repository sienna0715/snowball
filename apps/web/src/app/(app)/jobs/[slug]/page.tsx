import { redirect, notFound } from "next/navigation";
import { getCookieHeader } from "@/lib/cookies";
import { getJob } from "@/lib/jobs";
import DetailJobList from "./DetailJobList";

type JobProps = {
    params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

function parseJobId(slug: string) {
    const n = Number(slug);
    if (!Number.isInteger(n) || n <= 0) redirect("/jobs");
    return n;
}

export default async function JobDetailPage({ params }: JobProps) {
    const { slug } = await params;
    const jobId = parseJobId(slug);
    if (!jobId) redirect("/jobs");

    const cookieHeader = await Promise.resolve(getCookieHeader());

    let job: Awaited<ReturnType<typeof getJob>> | null = null;
    try {
        job = await getJob(jobId, { cookie: cookieHeader });
    } catch {
        job = null;
    }

    if (!job) return notFound();

    const dateRows: Array<{ label: string; value: unknown }> = [
        { label: "지원일", value: job.appliedAt },
        { label: "마감일", value: job.deadline },
    ];

    const companyRows: Array<{ label: string; value: unknown }> = [
        { label: "업종", value: job.industry },
        { label: "업력", value: job.year },
        { label: "사원수", value: job.employees },
        { label: "위치", value: job.location },
        { label: "대표명", value: job.ceo },
    ];

    const workRows: Array<{ label: string; value: unknown }> = [
        { label: "근무형태", value: job.employmentType },
        { label: "근무지", value: job.workLocation },
        { label: "급여", value: job.salary },
    ];

    return <DetailJobList job={job} dateRows={dateRows} companyRows={companyRows} workRows={workRows} />;
}
