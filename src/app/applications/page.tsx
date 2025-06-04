import { columns, Application } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Application[]> {
    return [
        {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        company: "가나다",
        email: "m@example.com",
        },
        {
        id: "728ed52f",
        amount: 200,
        status: "pending",
        company: "거너더",
        email: "abc@example.com",
        },
    ]
}

export default async function ApplicationsPage() {
    const data = await getData()
    
    return (
        <div className="w-full container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}