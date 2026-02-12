import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { jobsController } from "../controllers/job.js";
const router = express.Router();
router.use(authMiddleware);
// CRUD
router.get("/", jobsController.list);
router.get("/:jobId", jobsController.find);
router.post("/", jobsController.create);
router.patch("/:jobId", jobsController.update);
router.delete("/:jobId", jobsController.delete);
export default router;
//# sourceMappingURL=job.js.map