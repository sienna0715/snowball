import { asyncHandler } from "../utils/asyncHandler.js";
import { success } from "../utils/response.js";
export const jobsController = {
    create: asyncHandler(async (_req, res) => {
        console.log("POST /jobs", _req, res);
        return success(res, null);
    }),
    list: asyncHandler(async (_req, res) => {
        console.log("GET /jobs", _req, res);
        return success(res, null);
    }),
    find: asyncHandler(async (_req, res) => {
        console.log("GET /jobs/jobId", _req, res);
        return success(res, null);
    }),
    update: asyncHandler(async (_req, res) => {
        console.log("PATCH /jobs/jobId", _req, res);
        return success(res, null);
    }),
    delete: asyncHandler(async (_req, res) => {
        console.log("DELETE /jobs/jobId", _req, res);
        return success(res, null);
    }),
};
//# sourceMappingURL=job.js.map