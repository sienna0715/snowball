import type { ListJobsQuery } from "../db/jobs.js";
import type { CreateJobInput, UpdateJobInput } from "../controllers/jobs.js";
import { Prisma } from "@prisma/client";
export declare const jobsService: {
    create(userId: number, input: CreateJobInput): Promise<{
        companyName: string;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        status: import("@prisma/client").$Enums.JobStatus;
        position: string | null;
        jobUrl: string | null;
        companyIntro: string | null;
        location: string | null;
        industry: string | null;
        year: number | null;
        employees: number | null;
        ceo: string | null;
        workLocation: string | null;
        salary: string | null;
        other: Prisma.JsonValue;
        appliedAt: Date | null;
        deadline: Date | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    list(userId: number, query: ListJobsQuery): Promise<{
        items: {
            companyName: string;
            employmentType: import("@prisma/client").$Enums.EmploymentType;
            status: import("@prisma/client").$Enums.JobStatus;
            position: string | null;
            jobUrl: string | null;
            appliedAt: Date | null;
            deadline: Date | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        nextCursor: number | null;
    }>;
    get(userId: number, jobId: number): Promise<{
        companyName: string;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        status: import("@prisma/client").$Enums.JobStatus;
        position: string | null;
        jobUrl: string | null;
        companyIntro: string | null;
        location: string | null;
        industry: string | null;
        year: number | null;
        employees: number | null;
        ceo: string | null;
        workLocation: string | null;
        salary: string | null;
        other: Prisma.JsonValue;
        appliedAt: Date | null;
        deadline: Date | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(userId: number, jobId: number, input: UpdateJobInput): Promise<{
        companyName: string;
        employmentType: import("@prisma/client").$Enums.EmploymentType;
        status: import("@prisma/client").$Enums.JobStatus;
        position: string | null;
        jobUrl: string | null;
        appliedAt: Date | null;
        deadline: Date | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(userId: number, jobId: number): Promise<void>;
};
//# sourceMappingURL=jobs.d.ts.map