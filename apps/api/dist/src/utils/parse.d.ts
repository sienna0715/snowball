import { z } from "zod";
export type ValidationDetails = {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
};
/**
 * Zod v4 기준
 * - schema로 input을 검증하고, 성공 시 파싱된 데이터를 반환합니다.
 * - 실패 시 HttpError(400)로 통일된 details 포맷을 던집니다.
 */
export declare function parse<T extends z.ZodTypeAny>(schema: T, input: unknown, message?: string): z.infer<T>;
//# sourceMappingURL=parse.d.ts.map