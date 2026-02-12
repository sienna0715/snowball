import { parse } from "../utils/parse.js";
/**
 * router.post("/", validateBody(schema), controller)
 */
export function validateBody(schema, message = "Invalid request body") {
    return (req, _res, next) => {
        req.body = parse(schema, req.body, message);
        next();
    };
}
/**
 * 라우트: router.get("/:jobId", validateParams(schema), controller)
 */
export function validateParams(schema, message = "Invalid route params") {
    return (req, res, next) => {
        res.locals.params = parse(schema, req.params, message);
        next();
    };
}
/**
 * 라우트: router.get("/", validateQuery(schema), controller)
 */
export function validateQuery(schema, message = "Invalid query string") {
    return (req, res, next) => {
        res.locals.query = parse(schema, req.query, message);
        next();
    };
}
//# sourceMappingURL=validate.js.map