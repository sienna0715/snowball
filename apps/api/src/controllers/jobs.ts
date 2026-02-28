import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";
import { jobsService } from "../services/jobs.js";

/** Controller */
export const jobsController = {
    createJob: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId!;
        const job = await jobsService.create(userId, req.body);
        return success(res, job, 201);
    }),

    listJobs: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId!;
        const query = res.locals.query ?? {};
        const result = await jobsService.list(userId, query);

        return success(res, result);
    }),

    getJob: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { jobId } = res.locals.params;

        const job = await jobsService.get(userId, jobId);
        return success(res, job);
    }),

    updateJob: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { jobId } = res.locals.params;

        const job = await jobsService.update(userId, jobId, req.body);
        return success(res, job);
    }),

    deleteJob: asyncHandler(async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { jobId } = res.locals.params;

        await jobsService.remove(userId, jobId);
        return res.status(204).send();
    }),
};
