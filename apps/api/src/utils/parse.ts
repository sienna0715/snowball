import { z } from "zod";
import { HttpError } from "./error.js";

export type ValidationDetails = {
    formErrors: string[];
    fieldErrors: Record<string, string[] | undefined>;
};

/**
 * Zod v4 기준
 * - schema로 input을 검증하고, 성공 시 파싱된 데이터를 반환합니다.
 * - 실패 시 HttpError(400)로 통일된 details 포맷을 던집니다.
 */
export function parse<T extends z.ZodTypeAny>(
    schema: T,
    input: unknown,
    message = "Validation failed",
): z.infer<T> {
    const result = schema.safeParse(input);

    if (!result.success) {
        const flattened = z.flattenError(result.error);

        const details: ValidationDetails = {
            formErrors: flattened.formErrors ?? [],
            fieldErrors: flattened.fieldErrors ?? {},
        };

        throw new HttpError(message, 400, details);
    }

    return result.data;
}
