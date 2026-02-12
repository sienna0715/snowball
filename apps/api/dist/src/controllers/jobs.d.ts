import { z } from "zod";
/** Zod Schemas */
export declare const jobsSchemas: {
    jobIdParams: z.ZodObject<{
        jobId: z.ZodCoercedNumber<unknown>;
    }, z.core.$strip>;
    createBody: z.ZodObject<{
        companyName: z.ZodString;
        employmentType: z.ZodEnum<{
            FULL_TIME: "FULL_TIME";
            PART_TIME: "PART_TIME";
            CONTRACT: "CONTRACT";
            INTERN: "INTERN";
        }>;
        status: z.ZodEnum<{
            BOOKMARK: "BOOKMARK";
            APPLIED: "APPLIED";
            INTERVIEW: "INTERVIEW";
            OFFER: "OFFER";
            REJECTED: "REJECTED";
        }>;
        position: z.ZodOptional<z.ZodString>;
        jobUrl: z.ZodOptional<z.ZodURL>;
        companyIntro: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        industry: z.ZodOptional<z.ZodString>;
        year: z.ZodOptional<z.ZodNumber>;
        employees: z.ZodOptional<z.ZodNumber>;
        ceo: z.ZodOptional<z.ZodString>;
        workLocation: z.ZodOptional<z.ZodString>;
        salary: z.ZodOptional<z.ZodString>;
        other: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
        appliedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    }, z.core.$strip>;
    updateBody: z.ZodTypeAny;
    listQuery: z.ZodObject<{
        status: z.ZodOptional<z.ZodEnum<{
            BOOKMARK: "BOOKMARK";
            APPLIED: "APPLIED";
            INTERVIEW: "INTERVIEW";
            OFFER: "OFFER";
            REJECTED: "REJECTED";
        }>>;
        limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        cursor: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    }, z.core.$strip>;
};
export type CreateJobInput = z.infer<typeof jobsSchemas.createBody>;
export type UpdateJobInput = z.infer<typeof jobsSchemas.updateBody>;
/** Controller */
export declare const jobsController: {
    createJob: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    listJobs: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    getJob: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    updateJob: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    deleteJob: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
};
//# sourceMappingURL=jobs.d.ts.map