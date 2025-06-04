import path from "path";
import { promises as fs } from 'fs';

export type Application = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
    company: string
}

export async function getApplications(): Promise<Application[]> {
    const filePath = path.join(process.cwd(), 'data', 'applications.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}

export async function getApplication(id: string): Promise<Application | undefined> {
    const applications = await getApplications();
    return applications.find((app) => app.id === id);
}