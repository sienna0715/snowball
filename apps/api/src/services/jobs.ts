import { HttpError } from "../utils/error.js";
import * as jobsDb from "../db/jobs.js";
import type { ListJobsQuery, CreateJobData } from "../db/jobs.js";
import type { CreateJobInput, UpdateJobInput } from "../controllers/jobs.js";
import { Prisma } from "@prisma/client";

const JOB_NOT_FOUND = "Job not found" as const;

export const jobsService = {
    async create(userId: number, input: CreateJobInput) {
        const data = normalizeCreateInput(input);
        return jobsDb.createJob(userId, data);
    },

    async list(userId: number, query: ListJobsQuery) {
        return await jobsDb.getAll(userId, query);
    },

    async get(userId: number, jobId: number) {
        const job = await jobsDb.getById(jobId, userId);
        if (!job) throw new HttpError(JOB_NOT_FOUND, 404);
        return job;
    },

    async update(userId: number, jobId: number, input: UpdateJobInput) {
        const data = removeUndefined(input);
        const updated = await jobsDb.updateJob(jobId, userId, data);
        if (!updated) throw new HttpError(JOB_NOT_FOUND, 404);
        return updated;
    },

    async remove(userId: number, jobId: number) {
        const ok = await jobsDb.deleteJob(jobId, userId);
        if (!ok) throw new HttpError(JOB_NOT_FOUND, 404);
    },
};

function normalizeCreateInput(input: CreateJobInput): CreateJobData {
    return {
        // 필수 필드
        companyName: input.companyName,
        employmentType: input.employmentType,
        status: input.status,

        // nullable 필드
        position: input.position ?? null,
        jobUrl: input.jobUrl ?? null,
        companyIntro: input.companyIntro ?? null,
        location: input.location ?? null,
        industry: input.industry ?? null,
        year: input.year ?? null,
        employees: input.employees ?? null,
        ceo: input.ceo ?? null,
        workLocation: input.workLocation ?? null,
        salary: input.salary ?? null,
        other: input.other ?? Prisma.DbNull,
        appliedAt: input.appliedAt ?? null,
        deadline: input.deadline ?? null,
    };
}

function removeUndefined(obj: unknown) {
    if (!obj || typeof obj !== "object") return {};
    return Object.fromEntries(
        Object.entries(obj as Record<string, unknown>).filter(
            ([, v]) => v !== undefined,
        ),
    );
}
