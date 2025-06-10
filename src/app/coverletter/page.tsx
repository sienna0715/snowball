import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { columns } from "./columns"
import { DataTable } from "./data-table";
import { getCoverletter } from "@/service/coverletter";

export default async function CoverletterPage() {
    const datas = await getCoverletter();

    return (
        <div className="py-10 mb-25">
            <div className="w-full h-100 flex gap-4">
                <Card className="max-w-2xl w-1/2 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>지원동기</CardTitle>
                        <CardDescription>511자</CardDescription>
                        <CardAction>2025.06.05</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </CardContent>
                    <CardFooter>
                        <p>View</p>
                    </CardFooter>
                </Card>

                <Card className="max-w-2xl w-1/2 flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle>성장과정</CardTitle>
                        <CardDescription>425자</CardDescription>
                        <CardAction>2025.06.06</CardAction>
                    </CardHeader>
                    <CardContent>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy.</p>
                    </CardContent>
                    <CardFooter>
                        <p>View</p>
                    </CardFooter>
                </Card>
            </div>

            <div className="w-full container mx-auto py-10">
                <DataTable columns={columns} data={datas} />
            </div>
        </div>
    );
};