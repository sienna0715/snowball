import { getCoverletter } from "@/service/coverletter";
import { updateCoverletter } from "../../../../../../studio-hello-world/src/sanity/coverletter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default async function EditCoverletterPage({
    params,
}: {
    params: { slug: string };
}) {
    const coverletter = await getCoverletter(params.slug);

    return (
        <form action={updateCoverletter} className='flex flex-col'>
            <input type='hidden' name='_id' value={coverletter._id} />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <Label className='flex flex-col items-start'>
                    <span className='text-base'>Company</span>
                    <Input name='company' defaultValue={coverletter.company}  />
                </Label>
                <Label className='flex flex-col items-start'>
                    <span className='text-base'>Date</span>
                    <Input type='date' name='date' defaultValue={coverletter.date}  />
                </Label>
            </div>
            <Label htmlFor='title' className='flex flex-col items-start mb-8'>
                <span className='text-base'>Title</span>
                <Input name='title' defaultValue={coverletter.title} required />
            </Label>
            <Textarea
                name='content'
                defaultValue={coverletter.content}
                className='h-screen'
            />
            <Button type='submit' className='mt-4 cursor-pointer'>
                <Save />
                저장하기
            </Button>
        </form>
    );
}
