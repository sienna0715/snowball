// apps/api/src/schemas/jobs.ts
import { z } from "zod";
import { EmploymentType, JobStatus } from "@prisma/client";

const emptyToUndef = <T extends z.ZodTypeAny>(schema: T) =>
    z.preprocess((v) => (v === null || v === "" ? undefined : v), schema);

const createBody = z.object({
    companyName: z.string().min(1),
    employmentType: z.enum(EmploymentType),
    status: z.enum(JobStatus),

    position: emptyToUndef(z.string().optional()),
    jobUrl: emptyToUndef(z.url().optional()),
    companyIntro: emptyToUndef(z.string().optional()),
    location: emptyToUndef(z.string().optional()),
    industry: emptyToUndef(z.string().optional()),
    year: emptyToUndef(z.number().int().optional()),
    employees: emptyToUndef(z.number().int().optional()),
    ceo: emptyToUndef(z.string().optional()),

    workLocation: z.string().min(1),
    salary: emptyToUndef(z.string().optional()),
    other: z.unknown().nullable().optional(),

    responsibilities: z.array(z.string()).default([]),
    requirements: z.array(z.string()).default([]),
    preferred: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    requirementsChecked: z.array(z.string()).default([]),
    preferredChecked: z.array(z.string()).default([]),

    appliedAt: z.coerce.date().nullable().optional(),
    deadline: z.coerce.date().nullable().optional(),
});

const updateBody = createBody
    .partial()
    .refine((obj) => Object.keys(obj).length > 0, {
        message: "At least one field is required",
    });

export const jobsSchemas = {
    jobIdParams: z.object({
        jobId: z.coerce.number().int().positive(),
    }),
    createBody,
    updateBody,
    listQuery: z.object({
        status: z.enum(JobStatus).optional(),
        limit: z.coerce.number().int().positive().max(100).optional(),
        cursor: z.coerce.number().int().positive().optional(),
    }),
} as const;

export type CreateJobInput = z.infer<typeof jobsSchemas.createBody>;
export type UpdateJobInput = z.infer<typeof jobsSchemas.updateBody>;
