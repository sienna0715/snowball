import { z } from "zod";

export const createJobSchema = z.object({
    companyName: z.string().min(1, "회사명을 입력해주세요."),
    workLocation: z.string().min(1, "근무지를 입력해주세요."),
    employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"], {
        required_error: "근무형태를 선택해주세요.",
    }),
    status: z.enum(["BOOKMARK", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"], {
        required_error: "채용상태를 선택해주세요.",
    }),
});

export type FieldErrors<Shape> = Partial<Record<keyof Shape, string>>;

export function toFieldErrors<Shape>(err: z.ZodError): FieldErrors<Shape> {
    const out: Record<string, string> = {};

    for (const issue of err.issues) {
        const key = issue.path[0];
        if (typeof key === "string") out[key] = issue.message;
    }

    return out as FieldErrors<Shape>;
}
