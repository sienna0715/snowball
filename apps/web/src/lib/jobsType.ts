export const JOB_STATUSES = [
    "BOOKMARK",
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
] as const;

export const EMPLOYMENT_TYPES = [
    "FULL_TIME",
    "PART_TIME",
    "CONTRACT",
    "INTERN",
] as const;

export type JobStatus = (typeof JOB_STATUSES)[number];
export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export type Job = {
    id: number;
    companyName: string;
    position?: string | null;
    jobUrl?: string | null;
    companyIntro?: string | null;
    location?: string | null;
    industry?: string | null;
    year?: number | null;
    employees?: number | null;
    ceo?: string | null;

    employmentType: EmploymentType;
    workLocation?: string | null;
    salary?: string | null;
    other?: unknown;

    responsibilities: string[];
    requirements: string[];
    preferred: string[];
    benefits: string[];
    tags: string[];
    requirementsChecked: string[];
    preferredChecked: string[];

    appliedAt?: string | null;
    deadline?: string | null;
    status: JobStatus;

    createdAt?: string;
    updatedAt?: string;
};

export type JobsListQuery = {
    limit?: number;
    cursor?: number;
    status?: JobStatus;
};

export type JobsListResult = {
    items: Job[];
    nextCursor: number | null;
};

export type JobCreateInput = Omit<Job, "id" | "createdAt" | "updatedAt">;
export type JobUpdateInput = Partial<JobCreateInput>;

export type QueryValue = string | number | boolean | null | undefined;