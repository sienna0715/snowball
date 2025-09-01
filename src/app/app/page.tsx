import { ChartPieLabel } from "@/components/layout/PieChart"; 
import { getApplications } from "@/service/applications";
import { DataTable as ApplicationTable } from "./job/data-table";
import { columns as ApplicationColumns } from "./job/columns"
import { getCoverletter } from "@/service/coverletter";
import { DataTable as CoverletterTable } from "./coverletter/data-table";
import { columns as CoverletterColumns} from "./coverletter/columns"

export default async function Home() {
    const applicationDatas = await getApplications();
    const coverletterDatas = await getCoverletter();

    return (
        <div className="py-10 mb-25 flex flex-col gap-8">
            <div className="w-full flex gap-4">
                <div className="w-1/2">
                    <ChartPieLabel />
                </div>
                <div data-slot="card" className="w-1/2 bg-card text-card-foreground gap-6 rounded-xl border py-6 shadow-sm flex flex-col">
                    나의 강점
                </div>
            </div>
        
            <div className="w-full container mx-auto">
                <ApplicationTable columns={ApplicationColumns} data={applicationDatas} pageSize={3} />
            </div>

            <div className="w-full container mx-auto">
                <CoverletterTable columns={CoverletterColumns} data={coverletterDatas} pageSize={3} />
            </div>
        </div>
    );
}
