import express from "express";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.js"

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
app.use(errorMiddleware);

app.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
});
