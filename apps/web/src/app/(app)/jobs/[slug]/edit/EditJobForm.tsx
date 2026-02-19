"use client";

import { useState } from "react";
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
import type { Job } from "@/lib/jobs";

type Props = {
    job: Job;
    onSubmit: (formData: FormData) => void;
};

export default function EditJobForm({ job, onSubmit }: Props) {
    const [employmentType, setEmploymentType] = useState<Job["employmentType"]>(
        job.employmentType,
    );
    const [status, setStatus] = useState<Job["status"]>(job.status);

    return (
        <form action={onSubmit} className='flex flex-col gap-4 mb-16'>
            <input type='hidden' name='jobId' value={job.id} />

            <Label className='flex items-center'>
                <span className='min-w-25'>회사명</span>
                <Input
                    name='companyName'
                    className='max-w-3xl'
                    defaultValue={job.companyName}
                    required
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>공고 링크</span>
                <Input
                    name='jobUrl'
                    className='max-w-3xl'
                    defaultValue={job.jobUrl ?? ""}
                />
            </Label>

            <Label className='flex items-start'>
                <span className='min-w-25 pt-2'>회사 소개</span>
                <Textarea
                    name='companyIntro'
                    className='max-w-3xl'
                    defaultValue={job.companyIntro ?? ""}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>위치</span>
                <Input
                    name='location'
                    className='max-w-3xl'
                    defaultValue={job.location ?? ""}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>업종</span>
                <Input
                    name='industry'
                    className='max-w-3xl'
                    defaultValue={job.industry ?? ""}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>업력</span>
                <Input
                    name='year'
                    className='max-w-3xl'
                    defaultValue={job.year ?? undefined}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>사원수</span>
                <Input
                    name='employees'
                    className='max-w-3xl'
                    defaultValue={job.employees ?? undefined}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>대표명</span>
                <Input
                    name='ceo'
                    className='max-w-3xl'
                    defaultValue={job.ceo ?? ""}
                />
            </Label>

            <input type='hidden' name='employmentType' value={employmentType} />
            <Label className='flex items-center'>
                <span className='min-w-25'>근무 형태</span>
                <Select
                    value={employmentType}
                    onValueChange={(v) =>
                        setEmploymentType(v as Job["employmentType"])
                    }
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='선택' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='FULL_TIME'>정규직</SelectItem>
                        <SelectItem value='CONTRACT'>계약직</SelectItem>
                        <SelectItem value='INTERN'>인턴</SelectItem>
                        <SelectItem value='PART_TIME'>파트타임</SelectItem>
                    </SelectContent>
                </Select>
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>근무지</span>
                <Input
                    name='workLocation'
                    className='max-w-3xl'
                    defaultValue={job.workLocation ?? ""}
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>급여</span>
                <Input
                    name='salary'
                    className='max-w-3xl'
                    defaultValue={job.salary ?? ""}
                />
            </Label>

            <input type='hidden' name='status' value={status} />
            <Label className='flex items-center'>
                <span className='min-w-25'>채용절차</span>
                <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as Job["status"])}
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='선택' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='BOOKMARK'>북마크</SelectItem>
                        <SelectItem value='APPLIED'>지원</SelectItem>
                        <SelectItem value='INTERVIEW'>면접</SelectItem>
                        <SelectItem value='OFFER'>오퍼</SelectItem>
                        <SelectItem value='REJECTED'>불합격</SelectItem>
                    </SelectContent>
                </Select>
            </Label>

            <Button type='submit' className='mt-4 cursor-pointer'>
                <Save />
                저장하기
            </Button>
        </form>
    );
}
