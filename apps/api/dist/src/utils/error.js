export class HttpError extends Error {
    status;
    details;
    constructor(message, status = 400, details) {
        super(message);
        this.status = status;
        this.details = details;
    }
}
//# sourceMappingURL=error.js.map