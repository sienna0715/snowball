import type { ListJobsQuery } from "../db/jobs.js";
import type { CreateJobInput, UpdateJobInput } from "../controllers/jobs.js";
import { Prisma } from "@prisma/client";
export declare const jobsService: {
    create(userId: number, input: CreateJobInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        position: string | null;
        jobUrl: string | null;
        companyIntro: string | null;
        location: string | null;
        industry: string | null;
        year: number | null;
        employees: number | null;
        ceo: string | null;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        workLocation: string | null;
        salary: string | null;
        other: Prisma.JsonValue;
        appliedAt: Date | null;
        deadline: Date | null;
        status: import("@prisma/client").$Enums.JobStatus;
    }>;
    list(userId: number, query: ListJobsQuery): Promise<{
        items: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            companyName: string;
            position: string | null;
            jobUrl: string | null;
            employmentType: import("@prisma/client").$Enums.EmploymentType;
            appliedAt: Date | null;
            deadline: Date | null;
            status: import("@prisma/client").$Enums.JobStatus;
        }[];
        nextCursor: number | null;
    }>;
    get(userId: number, jobId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        position: string | null;
        jobUrl: string | null;
        companyIntro: string | null;
        location: string | null;
        industry: string | null;
        year: number | null;
        employees: number | null;
        ceo: string | null;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        workLocation: string | null;
        salary: string | null;
        other: Prisma.JsonValue;
        appliedAt: Date | null;
        deadline: Date | null;
        status: import("@prisma/client").$Enums.JobStatus;
    }>;
    update(userId: number, jobId: number, input: UpdateJobInput): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        companyName: string;
        position: string | null;
        jobUrl: string | null;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        appliedAt: Date | null;
        deadline: Date | null;
        status: import("@prisma/client").$Enums.JobStatus;
    }>;
    remove(userId: number, jobId: number): Promise<void>;
};
//# sourceMappingURL=jobs.d.ts.map