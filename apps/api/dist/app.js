import express from "express";
import { env } from "./config/env.js";
import authRouter from "./routes/auth.js";
import jobRouter from "./routes/job.js";
import coverletterRouter from "./routes/coverletter.js";
const app = express();
// middleware
// parsing
app.use(express.json());
// API
app.use("/auth", authRouter);
app.use("/job", jobRouter);
app.use("/coverletter", coverletterRouter);
// Error handling
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
});
//# sourceMappingURL=app.js.map