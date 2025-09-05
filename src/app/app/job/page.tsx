import { getJobs } from "@/service/job";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function JobPage() {
    const datas = await getJobs();
    
    return (
        <div className="w-full container mx-auto py-10">
            <DataTable columns={columns} data={datas} />
        </div>
    )
}