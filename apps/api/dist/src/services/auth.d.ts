import type { Request, Response } from "express";
export declare const authService: {
    startLogin(providerRaw: string, res: Response): Promise<string>;
    finishLogin(args: {
        provider: string;
        req: Request;
        res: Response;
    }): Promise<{
        email: string;
        name: string | null;
        picture: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMe(userId: number): Promise<{
        email: string;
        name: string | null;
        picture: string | null;
        id: number;
        createdAt: Date;
    } | null>;
    logout(res: Response): Promise<void>;
};
//# sourceMappingURL=auth.d.ts.map