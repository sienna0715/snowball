import { columns } from "./columns";
import { DataTable } from "./data-table";
import { listJobs } from "@/lib/jobs";
import { getCookieHeader } from "@/lib/cookies";

export default async function JobPage() {
    const cookieHeader = await getCookieHeader();
    const jobsAll = await listJobs(undefined, { cookie: cookieHeader });
    const datas = jobsAll?.items ?? [];

    return (
        <div className='w-full container mx-auto py-10'>
            <DataTable columns={columns} data={datas} />
        </div>
    );
}
