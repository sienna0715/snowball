import { z } from "zod";
import { EmploymentType, JobStatus } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";
import { jobsService } from "../services/jobs.js";
/** Zod Schemas */
export const jobsSchemas = {
    jobIdParams: z.object({
        jobId: z.coerce.number().int().positive(),
    }),
    createBody: z.object({
        companyName: z.string().min(1),
        employmentType: z.enum(EmploymentType),
        status: z.enum(JobStatus),
        position: z.string().optional(),
        jobUrl: z.url().optional(),
        companyIntro: z.string().optional(),
        location: z.string().optional(),
        industry: z.string().optional(),
        year: z.number().int().optional(),
        employees: z.number().int().optional(),
        ceo: z.string().optional(),
        workLocation: z.string().optional(),
        salary: z.string().optional(),
        other: z.unknown().nullable().optional(),
        appliedAt: z.coerce.date().optional(),
        deadline: z.coerce.date().optional(),
    }),
    updateBody: undefined,
    listQuery: z.object({
        status: z.enum(JobStatus).optional(),
        limit: z.coerce.number().int().positive().max(100).optional(),
        cursor: z.coerce.number().int().positive().optional(),
    }),
};
// updateBody는 createBody 기반 partial + 빈 객체 금지
jobsSchemas.updateBody = jobsSchemas.createBody
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
    message: "At least one field is required",
});
/** Controller */
export const jobsController = {
    createJob: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const job = await jobsService.create(userId, req.body);
        return success(res, job, 201);
    }),
    listJobs: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const query = res.locals.query ?? {};
        const result = await jobsService.list(userId, query);
        return success(res, result);
    }),
    getJob: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const { jobId } = res.locals.params;
        const job = await jobsService.get(userId, jobId);
        return success(res, job);
    }),
    updateJob: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const { jobId } = res.locals.params;
        const job = await jobsService.update(userId, jobId, req.body);
        return success(res, job);
    }),
    deleteJob: asyncHandler(async (req, res) => {
        const userId = req.userId;
        const { jobId } = res.locals.params;
        await jobsService.remove(userId, jobId);
        return res.status(204).send();
    }),
};
//# sourceMappingURL=jobs.js.map