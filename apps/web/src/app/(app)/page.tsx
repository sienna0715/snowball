import { getCookieHeader } from "@/lib/cookies";
import { listJobs } from "@/lib/jobs";
import { getCoverletters } from "@/service/coverletter";

import { DataTable as ApplicationTable } from "./jobs/data-table";
import { columns as ApplicationColumns } from "./jobs/columns";
import { DataTable as CoverletterTable } from "./coverletters/data-table";
import { columns as CoverletterColumns } from "./coverletters/columns";
// import { ChartPieLabel } from "@/components/layout/PieChart";

export default async function Home() {
    const cookieHeader = await getCookieHeader();
    const jobsAll = await listJobs(undefined, { cookie: cookieHeader });
    const applicationDatas = jobsAll?.items ?? [];
    const coverletterDatas = await getCoverletters();

    return (
        <div className='py-10 mb-25 flex flex-col gap-8'>
            {/* <div className="w-full flex gap-4">
                <div className="w-1/2">
                    <ChartPieLabel />
                </div>
                <div data-slot="card" className="w-1/2 bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col">
                    나의 강점
                </div>
            </div> */}

            <div className='w-full container mx-auto'>
                <ApplicationTable
                    columns={ApplicationColumns}
                    data={applicationDatas}
                    pageSize={3}
                />
            </div>

            <div className='w-full container mx-auto'>
                <CoverletterTable
                    columns={CoverletterColumns}
                    data={coverletterDatas}
                    pageSize={3}
                />
            </div>
        </div>
    );
}
