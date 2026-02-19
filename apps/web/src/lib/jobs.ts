// src/lib/jobs.ts
import { apiFetch } from "./api";

export const JOB_STATUSES = [
    "BOOKMARK",
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
] as const;

export const EMPLOYMENT_TYPES = [
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERN",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type Job = {
    id: number;
    companyName: string;
    position?: string | null;
    jobUrl?: string | null;
    companyIntro?: string | null;
    location?: string | null;
    industry?: string | null;
    year?: number | null;
    employees?: number | null;
    ceo?: string | null;

    employmentType: EmploymentType;
    workLocation?: string | null;
    salary?: string | null;
    other?: unknown;

    appliedAt?: string | null;
    deadline?: string | null;
    status: JobStatus;

    createdAt?: string;
    updatedAt?: string;
};

export type JobsListQuery = {
    limit?: number;
    cursor?: number;
    status?: JobStatus;
};

export type JobsListResult = {
    items: Job[];
    nextCursor: number | null;
};

export type JobCreateInput = Omit<Job, "id" | "createdAt" | "updatedAt">;
export type JobUpdateInput = Partial<JobCreateInput>;

type QueryValue = string | number | boolean | null | undefined;

function buildQueryString(query?: Record<string, QueryValue>) {
    if (!query) return "";

    const params = new URLSearchParams();

    Object.entries(query).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") return;
        params.set(k, String(v));
    });

    const s = params.toString();
    return s ? `?${s}` : "";
}

export async function listJobs(
    query?: JobsListQuery,
    options?: { cookie?: string },
) {
    return apiFetch<JobsListResult>(`/api/jobs${buildQueryString(query)}`, {
        method: "GET",
        cookie: options?.cookie,
    });
}

export async function getJob(jobId: number, options?: { cookie?: string }) {
    return apiFetch<Job>(`/api/jobs/${jobId}`, {
        method: "GET",
        cookie: options?.cookie,
    });
}

export async function createJob(
    input: JobCreateInput,
    options?: { cookie?: string },
) {
    return apiFetch<Job>("/api/jobs", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
        cookie: options?.cookie,
    });
}

export async function updateJob(
    jobId: number,
    input: JobUpdateInput,
    options?: { cookie?: string },
) {
    return apiFetch<Job>(`/api/jobs/${jobId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input),
        cookie: options?.cookie,
    });
}

export async function deleteJob(jobId: number, options?: { cookie?: string }) {
    return apiFetch<null>(`/api/jobs/${jobId}`, {
        method: "DELETE",
        cookie: options?.cookie,
    });
}
