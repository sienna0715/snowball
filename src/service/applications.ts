import path from "path";
import { promises as fs } from 'fs';

export type Application = {
    id: string;
    date: Date;
    name: string;
    location: string;
    industry: string;
    years: string;
    employees: string;
    ceo: string;
    type: string;
    workplace: string;
    salary: string;
    status: "서류통과" | "1차 통과" | "2차 통과"  | "불합격" | "최종 합격"
}

export async function getApplications(): Promise<Application[]> {
    const filePath = path.join(process.cwd(), 'data', 'applications.json');
    
    return await fs.readFile(filePath, 'utf-8')
    .then<Application[]>(JSON.parse)
    .then(datas => datas.sort((a, b) => (a.date > b.date) ? -1 : 1));
}

export async function getApplication(id:string): Promise<Application | undefined> {
    const applications = await getApplications();
    return applications.find((app) => app.id == id);
}