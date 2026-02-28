import { HttpError } from "../utils/error.js";
import * as jobsDb from "../db/jobs.js";
import { Prisma } from "@prisma/client";
const JOB_NOT_FOUND = "Job not found";
export const jobsService = {
    async create(userId, input) {
        const data = normalizeCreateInput(input);
        return jobsDb.createJob(userId, data);
    },
    async list(userId, query) {
        return await jobsDb.getAll(userId, query);
    },
    async get(userId, jobId) {
        const job = await jobsDb.getById(jobId, userId);
        if (!job)
            throw new HttpError(JOB_NOT_FOUND, 404);
        return job;
    },
    async update(userId, jobId, input) {
        const data = normalizeUpdateInput(input);
        const touchesRequirements = input.requirements !== undefined ||
            input.requirementsChecked !== undefined;
        const touchesPreferred = input.preferred !== undefined ||
            input.preferredChecked !== undefined;
        if (touchesRequirements || touchesPreferred) {
            const current = await jobsDb.getById(jobId, userId);
            if (!current)
                throw new HttpError(JOB_NOT_FOUND, 404);
            if (touchesRequirements) {
                const list = input.requirements !== undefined
                    ? (data.requirements ?? [])
                    : current.requirements;
                const checked = input.requirementsChecked !== undefined
                    ? input.requirementsChecked
                    : current.requirementsChecked;
                data.requirementsChecked = normalizeChecked(checked, list);
            }
            if (touchesPreferred) {
                const list = input.preferred !== undefined
                    ? (data.preferred ?? [])
                    : current.preferred;
                const checked = input.preferredChecked !== undefined
                    ? input.preferredChecked
                    : current.preferredChecked;
                data.preferredChecked = normalizeChecked(checked, list);
            }
        }
        const updated = await jobsDb.updateJob(jobId, userId, data);
        if (!updated)
            throw new HttpError(JOB_NOT_FOUND, 404);
        return updated;
    },
    async remove(userId, jobId) {
        const ok = await jobsDb.deleteJob(jobId, userId);
        if (!ok)
            throw new HttpError(JOB_NOT_FOUND, 404);
    },
};
function normalizeCreateInput(input) {
    const responsibilities = normalizeStringArray(input.responsibilities);
    const requirements = normalizeStringArray(input.requirements);
    const preferred = normalizeStringArray(input.preferred);
    const benefits = normalizeStringArray(input.benefits);
    const tags = normalizeTags(input.tags);
    const requirementsChecked = normalizeChecked(input.requirementsChecked, requirements);
    const preferredChecked = normalizeChecked(input.preferredChecked, preferred);
    return {
        // 필수 필드
        companyName: input.companyName,
        employmentType: input.employmentType,
        status: input.status,
        // nullable 필드
        position: input.position ?? null,
        jobUrl: input.jobUrl ?? null,
        companyIntro: input.companyIntro ?? null,
        location: input.location ?? null,
        industry: input.industry ?? null,
        year: input.year ?? null,
        employees: input.employees ?? null,
        ceo: input.ceo ?? null,
        workLocation: input.workLocation ?? null,
        salary: input.salary ?? null,
        other: input.other ?? Prisma.DbNull,
        appliedAt: input.appliedAt ?? null,
        deadline: input.deadline ?? null,
        responsibilities,
        requirements,
        preferred,
        benefits,
        tags,
        requirementsChecked,
        preferredChecked,
    };
}
function normalizeUpdateInput(input) {
    const base = removeUndefined(input);
    // 1) 배열이 "들어온 경우에만" 정규화
    const responsibilities = input.responsibilities === undefined
        ? undefined
        : normalizeStringArray(input.responsibilities);
    const requirements = input.requirements === undefined
        ? undefined
        : normalizeStringArray(input.requirements);
    const preferred = input.preferred === undefined
        ? undefined
        : normalizeStringArray(input.preferred);
    const benefits = input.benefits === undefined
        ? undefined
        : normalizeStringArray(input.benefits);
    const tags = input.tags === undefined ? undefined : normalizeTags(input.tags);
    // 2) checked 정합성: "목록도 함께 들어온 경우"에만 subset 보정 가능
    const requirementsChecked = input.requirementsChecked === undefined
        ? undefined
        : requirements
            ? normalizeChecked(input.requirementsChecked, requirements)
            : normalizeStringArray(input.requirementsChecked);
    const preferredChecked = input.preferredChecked === undefined
        ? undefined
        : preferred
            ? normalizeChecked(input.preferredChecked, preferred)
            : normalizeStringArray(input.preferredChecked);
    return {
        ...base,
        ...(responsibilities !== undefined ? { responsibilities } : {}),
        ...(requirements !== undefined ? { requirements } : {}),
        ...(preferred !== undefined ? { preferred } : {}),
        ...(benefits !== undefined ? { benefits } : {}),
        ...(tags !== undefined ? { tags } : {}),
        ...(requirementsChecked !== undefined ? { requirementsChecked } : {}),
        ...(preferredChecked !== undefined ? { preferredChecked } : {}),
    };
}
function removeUndefined(obj) {
    if (!obj || typeof obj !== "object")
        return {};
    return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}
function normalizeStringArray(value) {
    if (!Array.isArray(value))
        return [];
    const cleaned = value
        .filter((v) => typeof v === "string")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
    return Array.from(new Set(cleaned));
}
function normalizeChecked(value, list) {
    const checked = normalizeStringArray(value);
    const set = new Set(list);
    return checked.filter((v) => set.has(v));
}
function normalizeTags(value) {
    if (!Array.isArray(value))
        return [];
    const cleaned = value
        .filter((v) => typeof v === "string")
        .map((v) => v.trim().toLowerCase())
        .filter((v) => v.length > 0);
    return Array.from(new Set(cleaned));
}
//# sourceMappingURL=jobs.js.map