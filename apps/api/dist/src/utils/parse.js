import { z } from "zod";
import { HttpError } from "./error.js";
/**
 * Zod v4 기준
 * - schema로 input을 검증하고, 성공 시 파싱된 데이터를 반환합니다.
 * - 실패 시 HttpError(400)로 통일된 details 포맷을 던집니다.
 */
export function parse(schema, input, message = "Validation failed") {
    const result = schema.safeParse(input);
    if (!result.success) {
        const flattened = z.flattenError(result.error);
        const details = {
            formErrors: flattened.formErrors ?? [],
            fieldErrors: flattened.fieldErrors ?? {},
        };
        throw new HttpError(message, 400, details);
    }
    return result.data;
}
//# sourceMappingURL=parse.js.map