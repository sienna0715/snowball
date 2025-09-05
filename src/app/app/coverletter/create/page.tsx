import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline, Save } from "lucide-react";
import addCoverletter from "../../../../../studio-hello-world/src/sanity/coverletter";

export default function CoverletterCreatePage() {
    return (
        <div className='py-10 mb-25 flex flex-col gap-8'>
            <div className='w-max h-10 fixed top-5 right-15 flex justify-end'>
                <ToggleGroup variant='outline' type='multiple'>
                    <ToggleGroupItem value='bold' aria-label='Toggle bold'>
                        <Bold className='h-4 w-4' />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='italic' aria-label='Toggle italic'>
                        <Italic className='h-4 w-4' />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='strikethrough'
                        aria-label='Toggle strikethrough'
                    >
                        <Underline className='h-4 w-4' />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <form action={addCoverletter} className='flex flex-col'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                    <Label className='flex flex-col items-start'>
                        <span className='text-base'>Company</span>
                        <Input name='company' />
                    </Label>
                    <Label className='flex flex-col items-start'>
                        <span className='text-base'>Date</span>
                        <Input type='date' name='date' />
                    </Label>
                </div>
                <Label
                    htmlFor='title'
                    className='flex flex-col items-start mb-8'
                >
                    <span className='text-base'>Title</span>
                    <Input name='title' required />
                </Label>
                <Textarea name="content" className='h-screen' />
                <Button type='submit' className='mt-4 cursor-pointer'>
                    <Save />
                    저장하기
                </Button>
            </form>
        </div>
    );
}
