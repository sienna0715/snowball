import { prisma } from "./prisma.js";
import type { Prisma, JobStatus } from "@prisma/client";

/** =========================
 * Types
 * ========================= */
export type CreateJobData = Omit<
    Prisma.JobUncheckedCreateInput,
    "id" | "userId" | "createdAt" | "updatedAt"
>;

export type UpdateJobData = Prisma.JobUncheckedUpdateInput;

export type ListJobsQuery = {
    status?: JobStatus;
    limit?: number;
    cursor?: number; // Job.id cursor pagination
};

/** =========================
 * Select presets (중복 제거)
 * ========================= */
const jobListSelect = {
    id: true,
    companyName: true,
    position: true,
    jobUrl: true,
    employmentType: true,
    status: true,
    appliedAt: true,
    deadline: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.JobSelect;

const jobDetailSelect = {
    id: true,
    companyName: true,
    position: true,
    jobUrl: true,
    companyIntro: true,
    location: true,
    industry: true,
    year: true,
    employees: true,
    ceo: true,
    employmentType: true,
    workLocation: true,
    salary: true,
    other: true,
    appliedAt: true,
    deadline: true,
    status: true,
    createdAt: true,
    updatedAt: true,
} satisfies Prisma.JobSelect;

/** =========================
 * Pagination helpers
 * ========================= */
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

function clampLimit(limit?: number) {
    if (!limit) return DEFAULT_LIMIT;
    return Math.min(Math.max(limit, 1), MAX_LIMIT);
}

/** =========================
 * Create
 * ========================= */
export async function createJob(userId: number, data: CreateJobData) {
    return await prisma.job.create({
        data: { ...data, userId },
        select: jobDetailSelect,
    });
}

/** =========================
 * List (Cursor Pagination)
 * - 정렬 기준(orderBy)과 커서(cursor)가 같은 키(id)를 사용해
 * - 최신순: id desc
 * ========================= */
export async function getAll(userId: number, query: ListJobsQuery) {
    const take = clampLimit(query.limit);
    const where: Prisma.JobWhereInput = {
        userId,
        ...(query.status ? { status: query.status } : {}),
    };

    const rows = await prisma.job.findMany({
        where,
        orderBy: { id: "desc" },
        take: take + 1,
        ...(query.cursor ? { cursor: { id: query.cursor }, skip: 1 } : {}),
        select: jobListSelect,
    });

    const hasNext = rows.length > take;
    const items = hasNext ? rows.slice(0, take) : rows;
    const nextCursor = hasNext ? items[items.length - 1]!.id : null;

    return { items, nextCursor };
}

/** =========================
 * Get
 * ========================= */
export async function getById(jobId: number, userId: number) {
    return await prisma.job.findFirst({
        where: { id: jobId, userId },
        select: jobDetailSelect,
    });
}

/** =========================
 * Update (쿼리 1번으로)
 * - (id,userId)로 먼저 존재 확인 후 update (없으면 null 반환 + service에서 404 처리)
 * - 결과 count로 성공/실패 판단
 * ========================= */
export async function updateJob(
    jobId: number,
    userId: number,
    data: UpdateJobData,
) {
    const result = await prisma.job.updateMany({
        where: { id: jobId, userId },
        data,
    });

    if (result.count === 0) return null;

    return prisma.job.findFirst({
        where: { id: jobId, userId },
        select: jobListSelect,
    });
}

/** =========================
 * Delete (쿼리 1번으로)
 * - deleteMany도 count로 성공/실패 판단 가능
 * ========================= */
export async function deleteJob(jobId: number, userId: number) {
    const result = await prisma.job.deleteMany({
        where: { id: jobId, userId },
    });

    return result.count > 0;
}
