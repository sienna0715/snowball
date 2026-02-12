import type { Response } from "express";
export declare function success<T>(res: Response, data: T, status?: number): Response<any, Record<string, any>>;
export declare function fail(res: Response, message: string, status?: number, details?: unknown): Response<any, Record<string, any>>;
//# sourceMappingURL=response.d.ts.map