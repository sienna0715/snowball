import type { Prisma, JobStatus } from "@prisma/client";
/** =========================
 * Types
 * ========================= */
type JobListFields = "responsibilities" | "requirements" | "preferred" | "benefits" | "tags" | "requirementsChecked" | "preferredChecked";
export type CreateJobData = Omit<Prisma.JobUncheckedCreateInput, "id" | "userId" | "createdAt" | "updatedAt">;
export type UpdateJobData = Omit<Prisma.JobUncheckedUpdateManyInput, JobListFields> & Partial<Record<JobListFields, string[]>>;
export type ListJobsQuery = {
    status?: JobStatus;
    limit?: number;
    cursor?: number;
};
/** =========================
 * Create
 * ========================= */
export declare function createJob(userId: number, data: CreateJobData): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    companyName: string;
    employmentType: import("@prisma/client").$Enums.EmploymentType;
    status: import("@prisma/client").$Enums.JobStatus;
    position: string | null;
    jobUrl: string | null;
    companyIntro: string | null;
    location: string | null;
    industry: string | null;
    year: number | null;
    employees: number | null;
    ceo: string | null;
    workLocation: string | null;
    salary: string | null;
    other: Prisma.JsonValue;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
    tags: string[];
    requirementsChecked: string[];
    preferredChecked: string[];
    appliedAt: Date | null;
    deadline: Date | null;
}>;
/** =========================
 * List (Cursor Pagination)
 * - 정렬 기준(orderBy)과 커서(cursor)가 같은 키(id)를 사용해
 * - 최신순: id desc
 * ========================= */
export declare function getAll(userId: number, query: ListJobsQuery): Promise<{
    items: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        status: import("@prisma/client").$Enums.JobStatus;
        position: string | null;
        jobUrl: string | null;
        responsibilities: string[];
        requirements: string[];
        preferred: string[];
        benefits: string[];
        tags: string[];
        requirementsChecked: string[];
        preferredChecked: string[];
        appliedAt: Date | null;
        deadline: Date | null;
    }[];
    nextCursor: number | null;
}>;
/** =========================
 * Get
 * ========================= */
export declare function getById(jobId: number, userId: number): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    companyName: string;
    employmentType: import("@prisma/client").$Enums.EmploymentType;
    status: import("@prisma/client").$Enums.JobStatus;
    position: string | null;
    jobUrl: string | null;
    companyIntro: string | null;
    location: string | null;
    industry: string | null;
    year: number | null;
    employees: number | null;
    ceo: string | null;
    workLocation: string | null;
    salary: string | null;
    other: Prisma.JsonValue;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
    tags: string[];
    requirementsChecked: string[];
    preferredChecked: string[];
    appliedAt: Date | null;
    deadline: Date | null;
} | null>;
/** =========================
 * Update (쿼리 1번으로)
 * - (id,userId)로 먼저 존재 확인 후 update (없으면 null 반환 + service에서 404 처리)
 * - 결과 count로 성공/실패 판단
 * ========================= */
export declare function updateJob(jobId: number, userId: number, data: UpdateJobData): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    companyName: string;
    employmentType: import("@prisma/client").$Enums.EmploymentType;
    status: import("@prisma/client").$Enums.JobStatus;
    position: string | null;
    jobUrl: string | null;
    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
    tags: string[];
    requirementsChecked: string[];
    preferredChecked: string[];
    appliedAt: Date | null;
    deadline: Date | null;
} | null>;
/** =========================
 * Delete (쿼리 1번으로)
 * - deleteMany도 count로 성공/실패 판단 가능
 * ========================= */
export declare function deleteJob(jobId: number, userId: number): Promise<boolean>;
export {};
//# sourceMappingURL=jobs.d.ts.map