import { ChartPieLabel } from "@/components/layout/PieChart"; 
import { getApplications } from "@/service/applications";
import { DataTable as ApplicationTable } from "./applications/data-table";
import { columns as ApplicationColumns } from "./applications/columns"
import { getCoverletter } from "@/service/coverletter";
import { DataTable as CoverletterTable } from "./coverletter/data-table";
import { columns as CoverletterColumns} from "./coverletter/columns"

export default async function Home() {
    const applicationDatas = await getApplications();
    const coverletterDatas = await getCoverletter();

    return (
        <div className="py-10 mb-25 flex flex-col gap-8">
            <ChartPieLabel />
            
            <div className="w-full container mx-auto">
                <ApplicationTable columns={ApplicationColumns} data={applicationDatas} pageSize={3} />
            </div>

            <div className="w-full container mx-auto">
                <CoverletterTable columns={CoverletterColumns} data={coverletterDatas} pageSize={3} />
            </div>
        </div>
    );
}
