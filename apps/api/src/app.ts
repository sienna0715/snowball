import express from "express";
import { env } from "./config/env.js";

// middleware
import { errorMiddleware } from "./middlewares/error.js"
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";

// Routes
import authRouter from "./routes/auth.js";
import jobRouter from "./routes/jobs.js";
import coverletterRouter from "./routes/coverletters.js";

const app = express();

// proxy
app.set("trust proxy", 1);

// middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors());

// parsing
app.use(express.json());

// API
app.use("/auth", authRouter);
app.use("/jobs", jobRouter);
app.use("/coverletters", coverletterRouter);

app.use((req, _res, next) => {
  console.log(req.method, req.url);
  next();
});

// Error handling
app.use(errorMiddleware);

const port = Number(process.env.PORT) || Number(env.HOST_PORT) || 8080;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on ${port}`);
});