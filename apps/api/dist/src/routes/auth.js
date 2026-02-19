import express from "express";
import { authController } from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/auth.js";
const router = express.Router();
// OAuth
router.get("/providers", authController.providers);
router.get("/:provider/login", authController.login);
router.get("/:provider/callback", authController.oauth);
// session
router.get("/me", authMiddleware, authController.me);
router.post("/logout", authController.logout);
export default router;
//# sourceMappingURL=auth.js.map