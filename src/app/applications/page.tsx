import { getApplications } from "@/service/applications";
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function ApplicationsPage() {
    const datas = await getApplications();
    
    return (
        <div className="w-full container mx-auto py-10">
            <DataTable columns={columns} data={datas} />
        </div>
    )
}