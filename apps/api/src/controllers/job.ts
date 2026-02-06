import type { Request, Response } from "express";

export async function getJobs(req: Request, res: Response) {
    // console.log("GET /jobs", req, res)
}

export async function getJob(req: Request, res: Response) {
    // console.log("GET /jobs/jobId", req, res)
}

export async function createJob(req: Request, res: Response) {
    // console.log("POST /jobs", req, res)
}

export async function updateJob(req: Request, res: Response) {
    // console.log("PATCH /jobs/jobId", req, res)
}

export async function deleteJob(req: Request, res: Response) {
    // console.log("DELETE /jobs/jobId", req, res)
}