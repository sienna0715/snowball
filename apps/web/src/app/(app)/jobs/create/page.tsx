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

import type { EmploymentType, JobStatus } from "@/lib/jobs";
import { createJobAction } from "../actions";

export default function CreateJobPage() {
    const [employmentType, setEmploymentType] =
        useState<EmploymentType>("FULL_TIME");
    const [status, setStatus] = useState<JobStatus>("BOOKMARK");

    return (
        <div className='py-10 mb-25'>
            <form
                action={createJobAction}
                className='flex flex-col gap-4 mb-16'
            >
                <Label htmlFor='companyName' className='flex items-center'>
                    <span className='min-w-25'>회사명</span>
                    <Input name='companyName' className='max-w-3xl' required />
                </Label>
                <Label htmlFor='position' className='flex items-center'>
                    <span className='min-w-25'>직무</span>
                    <Input name='position' className='max-w-3xl' required />
                </Label>
                <Label htmlFor='jobUrl' className='flex items-center'>
                    <span className='min-w-25'>공고 링크</span>
                    <Input name='jobUrl' className='max-w-3xl' />
                </Label>
                <Label htmlFor='companyIntro' className='flex items-start'>
                    <span className='min-w-25 pt-2'>회사 소개</span>
                    <Textarea name='companyIntro' className='max-w-3xl' />
                </Label>
                <Label htmlFor='location' className='flex items-center'>
                    <span className='min-w-25'>위치</span>
                    <Input name='location' className='max-w-3xl' />
                </Label>
                <Label htmlFor='industry' className='flex items-center'>
                    <span className='min-w-25'>업종</span>
                    <Input name='industry' className='max-w-3xl' />
                </Label>
                <Label htmlFor='year' className='flex items-center'>
                    <span className='min-w-25'>업력</span>
                    <Input name='year' className='max-w-3xl' />
                </Label>
                <Label htmlFor='employees' className='flex items-center'>
                    <span className='min-w-25'>사원수</span>
                    <Input name='employees' className='max-w-3xl' />
                </Label>
                <Label htmlFor='ceo' className='flex items-center'>
                    <span className='min-w-25'>대표명</span>
                    <Input name='ceo' className='max-w-3xl' />
                </Label>
                <Label htmlFor='employmentType' className='flex items-center'>
                    <span className='min-w-25'>근무 형태</span>
                    <input
                        type='hidden'
                        name='employmentType'
                        value={employmentType}
                    />
                    <Select
                        value={employmentType}
                        onValueChange={(v) =>
                            setEmploymentType(v as EmploymentType)
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
                <Label htmlFor='workLocation' className='flex items-center'>
                    <span className='min-w-25'>근무지</span>
                    <Input name='workLocation' className='max-w-3xl' />
                </Label>
                <Label htmlFor='salary' className='flex items-center'>
                    <span className='min-w-25'>급여</span>
                    <Input name='salary' className='max-w-3xl' />
                </Label>
                <Label htmlFor='status' className='flex items-center'>
                    <span className='min-w-25'>채용절차</span>
                    <input type='hidden' name='status' value={status} />
                    <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as JobStatus)}
                    >
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='선택' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='BOOKMARK'>북마크</SelectItem>
                            <SelectItem value='APPLIED'>지원</SelectItem>
                            <SelectItem value='INTERVIEW'>면접</SelectItem>
                            <SelectItem value='OFFER'>합격</SelectItem>
                            <SelectItem value='REJECTED'>불합격</SelectItem>
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
                <Button type='submit' className='mt-4 cursor-pointer'>
                    <Save />
                    저장하기
                </Button>
            </form>
        </div>
    );
}
