import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
router.use(authMiddleware);
// CRUD
router.post("/");
router.get("/");
router.get("/:jobId");
router.patch("/:jobId");
router.delete("/:jobId");
export default router;
//# sourceMappingURL=job.js.map