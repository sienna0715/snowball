import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { updateJob } from "../../../../../../studio-hello-world/src/sanity/job";
import { redirect } from "next/navigation";
import { getJob } from "@/service/job";

type Params = {
    slug: string
}

export default async function EditJobPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const job = await getJob(slug);

    if (!job) {
        redirect('/app/job');
    }

    return (
        <div className='py-10 mb-25'>
            <form action={updateJob} className='flex flex-col gap-4 mb-16'>
                <input type='hidden' name='_id' value={job._id} />
                <Label htmlFor='company' className='flex items-center'>
                    <span className='min-w-25'>회사명</span>
                    <Input name='company' className='max-w-3xl' defaultValue={job.company} required />
                </Label>
                <Label htmlFor='url' className='flex items-center'>
                    <span className='min-w-25'>공고 링크</span>
                    <Input name='url' className='max-w-3xl' defaultValue={job.url} />
                </Label>
                <Label htmlFor='introduce' className='flex items-start'>
                    <span className='min-w-25 pt-2'>회사 소개</span>
                    <Textarea name='introduce' className='max-w-3xl' defaultValue={job.introduce} />
                </Label>
                <Label htmlFor='location' className='flex items-center'>
                    <span className='min-w-25'>위치</span>
                    <Input name='location' className='max-w-3xl' defaultValue={job.location} />
                </Label>
                <Label htmlFor='industry' className='flex items-center'>
                    <span className='min-w-25'>업종</span>
                    <Input name='industry' className='max-w-3xl' defaultValue={job.industry} />
                </Label>
                <Label htmlFor='year' className='flex items-center'>
                    <span className='min-w-25'>업력</span>
                    <Input name='year' className='max-w-3xl' defaultValue={job.year} />
                </Label>
                <Label htmlFor='employees' className='flex items-center'>
                    <span className='min-w-25'>사원수</span>
                    <Input name='employees' className='max-w-3xl' defaultValue={job.employees} />
                </Label>
                <Label htmlFor='ceo' className='flex items-center'>
                    <span className='min-w-25'>대표명</span>
                    <Input name='ceo' className='max-w-3xl' defaultValue={job.ceo} />
                </Label>
                <Label htmlFor='employmentType' className='flex items-center'>
                    <span className='min-w-25'>근무 형태</span>

                    <Select name='employmentType' defaultValue={job.employmentType}>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='선택' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='정규직' >정규직</SelectItem>
                            <SelectItem value='계약직'>계약직</SelectItem>
                            <SelectItem value='인턴'>인턴</SelectItem>
                            <SelectItem value='파트타임'>파트타임</SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
                <Label htmlFor='workLocation' className='flex items-center'>
                    <span className='min-w-25'>근무지</span>
                    <Input name='workLocation' className='max-w-3xl' defaultValue={job.workLocation} />
                </Label>
                <Label htmlFor='salary' className='flex items-center'>
                    <span className='min-w-25'>급여</span>
                    <Input name='salary' className='max-w-3xl' defaultValue={job.salary} />
                </Label>
                <Label htmlFor='email' className='flex items-center'>
                    <span className='min-w-25'>채용절차</span>
                    <Select name='status' defaultValue={job.status}>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='선택' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='서류 심사'>서류 심사</SelectItem>
                            <SelectItem value='서류 합격'>서류 합격</SelectItem>
                            <SelectItem value='1차 합격'>1차 합격</SelectItem>
                            <SelectItem value='2차 합격'>2차 합격</SelectItem>
                            <SelectItem value='면접 합격'>면접 합격</SelectItem>
                            <SelectItem value='최종 합격'>최종 합격</SelectItem>
                            <SelectItem value='불합격'>불합격</SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
                {/* <Label htmlFor='email' className='flex items-center'>
                    <span className='min-w-25'>참조</span>
                    <Input className='max-w-3xl' />
                </Label>
                <Label htmlFor='email' className='flex items-center'>
                    <span className='min-w-25'>채용절차</span>
                    <Input className='max-w-3xl' />
                </Label>
                
                <Label htmlFor='email' className='flex items-start'>
                    <span className='min-w-25 pt-2'>문화 / 복리후생</span>
                    <Textarea className='max-w-3xl' />
                </Label>
                <Label htmlFor='email' className='flex items-start'>
                    <span className='min-w-25 pt-2'>담당업무</span>
                    <Textarea className='max-w-3xl' />
                </Label>
                <Label htmlFor='email' className='flex items-start'>
                    <span className='min-w-25 pt-2'>자격요건</span>
                    <Textarea className='max-w-3xl' />
                </Label>
                <Label htmlFor='email' className='flex items-start'>
                    <span className='min-w-25 pt-2'>우대사항</span>
                    <Textarea className='max-w-3xl' />
                </Label> */}
                <Button type='submit' className="mt-4 cursor-pointer">
                    <Save />
                    저장하기
                </Button>
            </form>
        </div>
    );
}
