import { HttpError } from "../utils/error.js";
import * as jobsDb from "../db/jobs.js";
import { Prisma } from "@prisma/client";
const JOB_NOT_FOUND = "Job not found";
export const jobsService = {
    async create(userId, input) {
        const data = normalizeCreateInput(input);
        return jobsDb.createJob(userId, data);
    },
    async list(userId, query) {
        return await jobsDb.getAll(userId, query);
    },
    async get(userId, jobId) {
        const job = await jobsDb.getById(jobId, userId);
        if (!job)
            throw new HttpError(JOB_NOT_FOUND, 404);
        return job;
    },
    async update(userId, jobId, input) {
        const data = removeUndefined(input);
        const updated = await jobsDb.updateJob(jobId, userId, data);
        if (!updated)
            throw new HttpError(JOB_NOT_FOUND, 404);
        return updated;
    },
    async remove(userId, jobId) {
        const ok = await jobsDb.deleteJob(jobId, userId);
        if (!ok)
            throw new HttpError(JOB_NOT_FOUND, 404);
    },
};
function normalizeCreateInput(input) {
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
function removeUndefined(obj) {
    if (!obj || typeof obj !== "object")
        return {};
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}
//# sourceMappingURL=jobs.js.map