import { promises as fs } from "fs";
import path from "path";


export type Coverletter = {
    date: Date;
    title: "string";
    target: "string";
}

export async function getCoverletter(): Promise<Coverletter[]> {
    const filePath = path.join(process.cwd(), 'data', 'coverletter.json');

    return await fs.readFile(filePath, 'utf-8')
    .then<Coverletter[]>(JSON.parse)
    .then(datas => datas.sort((a, b) => (a.date > b.date) ? -1 : 1));
} 