import { z } from "zod";
import { HttpError } from "../utils/error.js";
export function validate(schema, input) {
    const result = schema.safeParse(input);
    if (!result.success) {
        const flattened = z.flattenError(result.error);
        throw new HttpError("Validation failed", 400, flattened);
    }
    return result.data;
}
//# sourceMappingURL=validate.js.map