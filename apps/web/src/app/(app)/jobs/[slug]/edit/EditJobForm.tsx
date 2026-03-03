"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { updateJob } from "@/lib/jobs";
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
import type { Job, JobUpdateInput } from "@/lib/jobsType";
import { z } from "zod";
import {
    createJobSchema,
    toFieldErrors,
    type FieldErrors,
} from "../../../../../lib/validationField";

type EditJobInput = z.infer<typeof createJobSchema>;

type Props = {
    job: Job;
};

function s(fd: FormData, key: string): string {
    return String(fd.get(key) ?? "").trim();
}

function sOrNull(fd: FormData, key: string): string | null {
    const v = s(fd, key);
    return v ? v : null;
}

function numOrNull(fd: FormData, key: string): number | null {
    const v = s(fd, key);
    if (!v) return null;
    const n = Number(v);
    return Number.isNaN(n) ? null : n;
}

function dateIsoOrNull(fd: FormData, key: string): string | null {
    const v = s(fd, key);
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function linesToArray(fd: FormData, key: string): string[] {
    const raw = String(fd.get(key) ?? "");
    const normalized = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    return normalized
        .split(/\n+/)
        .map((v) => v.trim())
        .filter(Boolean);
}

function csvToArray(fd: FormData, key: string): string[] {
    const raw = s(fd, key);
    if (!raw) return [];
    return raw
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
}

function buildUpdatePayload(fd: FormData, job: Job): JobUpdateInput {
    return {
        // required in UI
        companyName: s(fd, "companyName"),

        // nullable strings
        companyIntro: sOrNull(fd, "companyIntro"),
        jobUrl: sOrNull(fd, "jobUrl"),
        location: sOrNull(fd, "location"),
        industry: sOrNull(fd, "industry"),
        ceo: sOrNull(fd, "ceo"),
        workLocation: sOrNull(fd, "workLocation"),
        salary: sOrNull(fd, "salary"),

        // numbers
        year: numOrNull(fd, "year"),
        employees: numOrNull(fd, "employees"),

        // enums come from hidden inputs synced with Select
        employmentType: s(fd, "employmentType") as Job["employmentType"],
        status: s(fd, "status") as Job["status"],

        // dates
        appliedAt: dateIsoOrNull(fd, "appliedAt"),
        deadline: dateIsoOrNull(fd, "deadline"),

        // arrays
        responsibilities: linesToArray(fd, "responsibilities"),
        requirements: linesToArray(fd, "requirements"),
        preferred: linesToArray(fd, "preferred"),
        benefits: linesToArray(fd, "benefits"),
        tags: csvToArray(fd, "tags"),

        // 체크리스트 UI가 아직 없으므로 기존 값을 유지
        requirementsChecked: job.requirementsChecked ?? [],
        preferredChecked: job.preferredChecked ?? [],
    };
}

export default function EditJobForm({ job }: Props) {
    const [employmentType, setEmploymentType] = useState<Job["employmentType"]>(
        job.employmentType,
    );
    const [status, setStatus] = useState<Job["status"]>(job.status);
    const router = useRouter();
    const [errors, setErrors] = useState<FieldErrors<EditJobInput>>({});

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const fd = new FormData(e.currentTarget);
        const payload = buildUpdatePayload(fd, job);

        const input = {
            companyName: String(fd.get("companyName") ?? ""),
            workLocation: String(fd.get("workLocation") ?? ""),
            employmentType: String(fd.get("employmentType") ?? ""),
            status: String(fd.get("status") ?? ""),
        };

        const schema = createJobSchema.pick({
            companyName: true,
            workLocation: true,
            employmentType: true,
            status: true,
        });

        const result = schema.safeParse(input);
        if (!result.success) {
            setErrors(toFieldErrors(result.error));
            return;
        }

        setErrors({});

        await updateJob(job.id, payload);
        router.push(`/jobs/${job.id}`);
        router.refresh();
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 mb-16'
        >
            <input type='hidden' name='jobId' value={job.id} />

            <Label className='flex items-center'>
                <span className='min-w-25'>회사명</span>
                <div className='flex-1 flex-col'>
                    <Input
                        name='companyName'
                        className='max-w-3xl'
                        defaultValue={job.companyName}
                        onChange={() =>
                            setErrors((p) => ({ ...p, companyName: undefined }))
                        }
                    />
                    {errors.companyName && (
                        <p
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                color: "#ff3838",
                            }}
                        >
                            {errors.companyName}
                        </p>
                    )}
                </div>
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
                <span className='min-w-25'>공고 링크</span>
                <Input
                    name='jobUrl'
                    className='max-w-3xl'
                    defaultValue={job.jobUrl ?? ""}
                />
            </Label>
            <Label className='flex items-center'>
                <span className='min-w-25'>지원일</span>
                <Input
                    type='date'
                    name='appliedAt'
                    className='max-w-3xl'
                    defaultValue={(job.appliedAt ?? "").slice(0, 10)}
                />
            </Label>
            <Label className='flex items-center'>
                <span className='min-w-25'>마감일</span>
                <Input
                    type='date'
                    name='deadline'
                    className='max-w-3xl'
                    defaultValue={(job.deadline ?? "").slice(0, 10)}
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
                <span className='min-w-25'>위치</span>
                <Input
                    name='location'
                    className='max-w-3xl'
                    defaultValue={job.location ?? ""}
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
                <span className='min-w-25'>근무형태</span>
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
                <div className='flex-1 flex-col'>
                    <Input
                        name='workLocation'
                        className='max-w-3xl'
                        defaultValue={job.workLocation ?? ""}
                        onChange={() =>
                            setErrors((p) => ({
                                ...p,
                                workLocation: undefined,
                            }))
                        }
                    />
                    {errors.workLocation && (
                        <p
                            style={{
                                marginTop: 8,
                                fontSize: 12,
                                color: "#ff3838",
                            }}
                        >
                            {errors.workLocation}
                        </p>
                    )}
                </div>
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

            <Label className='flex items-start'>
                <span className='min-w-25 pt-2'>주요업무</span>
                <Textarea
                    name='responsibilities'
                    className='max-w-3xl'
                    defaultValue={(job.responsibilities ?? []).join("\n")}
                    placeholder='한 줄에 하나씩 입력'
                />
            </Label>

            <Label className='flex items-start'>
                <span className='min-w-25 pt-2'>자격요건</span>
                <Textarea
                    name='requirements'
                    className='max-w-3xl'
                    defaultValue={(job.requirements ?? []).join("\n")}
                    placeholder='한 줄에 하나씩 입력'
                />
            </Label>

            <Label className='flex items-start'>
                <span className='min-w-25 pt-2'>우대사항</span>
                <Textarea
                    name='preferred'
                    className='max-w-3xl'
                    defaultValue={(job.preferred ?? []).join("\n")}
                    placeholder='한 줄에 하나씩 입력'
                />
            </Label>

            <Label className='flex items-start'>
                <span className='min-w-25 pt-2'>문화 / 복리후생</span>
                <Textarea
                    name='benefits'
                    className='max-w-3xl'
                    defaultValue={(job.benefits ?? []).join("\n")}
                    placeholder='한 줄에 하나씩 입력'
                />
            </Label>

            <Label className='flex items-center'>
                <span className='min-w-25'>태그</span>
                <Input
                    name='tags'
                    className='max-w-3xl'
                    defaultValue={(job.tags ?? []).join(", ")}
                    placeholder='쉼표(,)로 구분'
                />
            </Label>

            <Button type='submit' className='mt-4 cursor-pointer'>
                <Save />
                저장하기
            </Button>
        </form>
    );
}
