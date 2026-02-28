"use server";

import { getCookieHeader } from "@/lib/cookies";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createJob, updateJob, deleteJob } from "@/lib/jobs";
import { JOB_STATUSES, EMPLOYMENT_TYPES } from "@/lib/jobsType";
import type {
    JobCreateInput,
    JobUpdateInput,
    JobStatus,
    EmploymentType,
} from "@/lib/jobsType";

/** ---------- FormData parsing helpers ---------- */

function str(fd: FormData, key: string) {
    return String(fd.get(key) ?? "").trim();
}

function strOrNull(fd: FormData, key: string): string | null {
    const v = String(fd.get(key) ?? "").trim();
    return v ? v : null;
}

function numOrNull(fd: FormData, key: string): number | null {
    const v = String(fd.get(key) ?? "").trim();
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function jobEmploymentType(
    fd: FormData,
    key = "employmentType",
): EmploymentType {
    const v = String(fd.get(key) ?? "").trim();
    return (EMPLOYMENT_TYPES as readonly unknown[]).includes(v)
        ? (v as EmploymentType)
        : "FULL_TIME";
}

function jobStatus(fd: FormData, key = "status"): JobStatus {
    const v = String(fd.get(key) ?? "").trim();
    return (JOB_STATUSES as readonly unknown[]).includes(v)
        ? (v as JobStatus)
        : "APPLIED";
}

function textareaToArray(fd: FormData, key: string): string[] {
    const raw = String(fd.get(key) ?? "");
    const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    return normalized
        .split(/\n+/) // 엔터(1번 이상)를 항목 구분자로
        .map((v) => v.trim())
        .filter(Boolean);
}

function tagsToArray(fd: FormData, key = "tags"): string[] {
    return String(fd.get(key) ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
}

/**
 * CREATE (POST /jobs)
 */
export async function createJobAction(formData: FormData) {
    const cookie = await getCookieHeader();

    const payload: JobCreateInput = {
        companyName: str(formData, "companyName"),
        position: strOrNull(formData, "position"),
        jobUrl: strOrNull(formData, "jobUrl"),
        companyIntro: strOrNull(formData, "companyIntro"),
        location: strOrNull(formData, "location"),
        industry: strOrNull(formData, "industry"),
        year: numOrNull(formData, "year"),
        employees: numOrNull(formData, "employees"),
        ceo: strOrNull(formData, "ceo"),
        employmentType: jobEmploymentType(formData),
        workLocation: strOrNull(formData, "workLocation"),
        salary: strOrNull(formData, "salary"),

        responsibilities: textareaToArray(formData, "responsibilities"),
        requirements: textareaToArray(formData, "requirements"),
        preferred: textareaToArray(formData, "preferred"),
        benefits: textareaToArray(formData, "benefits"),
        tags: tagsToArray(formData),
        // create 화면에서는 체크 상태 입력 UI가 아직 없으므로 기본 빈 배열
        requirementsChecked: [],
        preferredChecked: [],

        other: null,
        appliedAt: null,
        deadline: null,

        status: jobStatus(formData),
    };

    await createJob(payload, { cookie });

    revalidatePath("/jobs");
    redirect("/jobs");
}

/**
 * UPDATE (PATCH /jobs/:jobId)
 * - PATCH는 "부분 수정"이므로 Partial로 보내는 게 맞습니다.
 */
export async function updateJobAction(jobId: number, formData: FormData) {
    const cookie = await getCookieHeader();

    const payload: JobUpdateInput = {
        companyName: str(formData, "companyName") || undefined,
        position: strOrNull(formData, "position") ?? undefined,
        jobUrl: strOrNull(formData, "jobUrl") ?? undefined,
        companyIntro: strOrNull(formData, "companyIntro") ?? undefined,
        location: strOrNull(formData, "location") ?? undefined,
        industry: strOrNull(formData, "industry") ?? undefined,
        year: numOrNull(formData, "year") ?? undefined,
        employees: numOrNull(formData, "employees") ?? undefined,
        ceo: strOrNull(formData, "ceo") ?? undefined,
        employmentType: jobEmploymentType(formData),
        workLocation: strOrNull(formData, "workLocation") ?? undefined,
        salary: strOrNull(formData, "salary") ?? undefined,

        // ⚠️ select가 항상 값이 넘어오는 UI면 status가 매번 덮어써질 수 있음
        //   지금은 "항상 status도 업데이트한다" 정책으로 단순화
        status: jobStatus(formData),

        responsibilities:
            textareaToArray(formData, "responsibilities") || undefined,
        requirements: textareaToArray(formData, "requirements") || undefined,
        preferred: textareaToArray(formData, "preferred") || undefined,
        benefits: textareaToArray(formData, "benefits") || undefined,
        tags: tagsToArray(formData) || undefined,
        requirementsChecked: undefined,
        preferredChecked: undefined,
    };

    await updateJob(jobId, payload, { cookie });

    revalidatePath(`/jobs/${jobId}`);
    redirect(`/jobs/${jobId}`);
}

/**
 * DELETE (DELETE /jobs/:jobId)
 */
export async function deleteJobAction(jobId: number) {
    const cookie = await getCookieHeader();

    await deleteJob(jobId, { cookie });

    revalidatePath("/jobs");
    redirect("/jobs");
}
