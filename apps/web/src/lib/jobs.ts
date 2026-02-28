// src/lib/jobs.ts
import { apiFetch } from "./api";
import type {
    Job,
    JobsListQuery,
    JobsListResult,
    JobCreateInput,
    JobUpdateInput,
    QueryValue,
} from "./jobsType";

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
