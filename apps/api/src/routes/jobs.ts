import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
    validateBody,
    validateParams,
    validateQuery,
} from "../middlewares/validate.js";
import { jobsController, jobsSchemas } from "../controllers/jobs.js";

const router = express.Router();

router.use(authMiddleware);

// CRUD
router.post(
    "/",
    validateBody(jobsSchemas.createBody),
    jobsController.createJob,
);
router.get("/", validateQuery(jobsSchemas.listQuery), jobsController.listJobs);
router.get(
    "/:jobId",
    validateParams(jobsSchemas.jobIdParams),
    jobsController.getJob,
);
router.patch(
    "/:jobId",
    validateParams(jobsSchemas.jobIdParams),
    validateBody(jobsSchemas.updateBody),
    jobsController.updateJob,
);
router.delete(
    "/:jobId",
    validateParams(jobsSchemas.jobIdParams),
    jobsController.deleteJob,
);

export default router;
