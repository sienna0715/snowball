"use client";

import type React from "react";
import Link from "next/link";
import { deleteJobAction } from "../actions";

/** shadcn */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import RecruitmentProcess from "@/components/RecruitmentProcess";
import {
    Menubar,
    MenubarMenu,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";
import type { EmploymentType, Job } from "@/lib/jobsType";

type Props = {
    job: Job;
    dateRows: Array<{ label: string; value: unknown }>;
    companyRows: Array<{ label: string; value: unknown }>;
    workRows: Array<{ label: string; value: unknown }>;
};

export default function DetailJobList({
    job,
    dateRows,
    companyRows,
    workRows,
}: Props) {
    const uniq = (arr: string[] = []) =>
        Array.from(new Set(arr)).filter(Boolean);
    const isChecked = (checked: string[] = [], item: string) =>
        checked.includes(item);
    const EMPLOYMENT_TYPE_LABEL: Record<EmploymentType, string> = {
        FULL_TIME: "정규직",
        CONTRACT: "계약직",
        INTERN: "인턴",
        PART_TIME: "파트타임",
    };
    const formatRowValue = (label: string, value: unknown) => {
        if (label === "근무형태" && typeof value === "string") {
            return EMPLOYMENT_TYPE_LABEL[value as EmploymentType] ?? value;
        }
        return String(value ?? "-");
    };

    return (
        <div className='py-10 mb-25'>
            <Menubar className='w-max'>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>

                <MenubarMenu>
                    <Link href={`/jobs/${job.id}/edit`}>
                        <MenubarTrigger>Edit</MenubarTrigger>
                    </Link>
                </MenubarMenu>

                <MenubarMenu>
                    <form action={deleteJobAction.bind(null, job.id)}>
                        <input type='hidden' name='_id' value={job.id} />
                        <MenubarTrigger asChild>
                            <button type='submit' className='w-full text-left'>
                                Delete
                            </button>
                        </MenubarTrigger>
                    </form>
                </MenubarMenu>
            </Menubar>

            <div className='w-full flex flex-col gap-4 mb-4 mt-8'>
                <h1 className='text-4xl font-bold pb-4'>{job.companyName}</h1>

                {job.companyIntro ? (
                    <p className='w-full max-w-5xl'>{job.companyIntro}</p>
                ) : null}

                {job.jobUrl ? (
                    <Link
                        href={job.jobUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='underline underline-offset-4 w-fit'
                    >
                        공고 링크
                    </Link>
                ) : null}
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dateRows.map(({ label, value }) => (
                        <TableRow key={label}>
                            <TableCell className='font-bold'>{label}</TableCell>
                            <TableCell>{String(value ?? "-")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companyRows.map(({ label, value }) => (
                        <TableRow key={label}>
                            <TableCell className='font-bold'>{label}</TableCell>
                            <TableCell>{String(value ?? "-")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workRows.map(({ label, value }) => (
                        <TableRow key={label}>
                            <TableCell className='font-bold'>{label}</TableCell>
                            <TableCell>
                                {formatRowValue(label, value)}
                            </TableCell>
                        </TableRow>
                    ))}

                    {/* <TableRow>
                        <TableCell className='font-bold'>참조</TableCell>
                        <TableCell>
                            {job.other ? (
                                <pre className='whitespace-pre-wrap text-sm'>
                                    {JSON.stringify(job.other, null, 2)}
                                </pre>
                            ) : (
                                "-"
                            )}
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>

            <div className='my-16'>
                <span className='font-bold'>채용절차</span>
                <RecruitmentProcess
                    steps={["원서접수", "면접전형", "최종합격"]}
                    status={job.status}
                />
            </div>

            <Accordion type='multiple'>
                {uniq(job.responsibilities).length > 0 && (
                    <AccordionItem value='responsibilities'>
                        <AccordionTrigger className='font-bold text-base'>
                            주요업무
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='list-disc pl-5 space-y-2'>
                                {uniq(job.responsibilities).map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {uniq(job.requirements).length > 0 && (
                    <AccordionItem value='requirements'>
                        <AccordionTrigger className='font-bold text-base'>
                            자격요건
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='space-y-2'>
                                {uniq(job.requirements).map((item) => (
                                    <li
                                        key={item}
                                        className='flex items-center gap-2'
                                    >
                                        <Checkbox
                                            checked={isChecked(
                                                job.requirementsChecked,
                                                item,
                                            )}
                                            disabled
                                        />
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {uniq(job.preferred).length > 0 && (
                    <AccordionItem value='preferred'>
                        <AccordionTrigger className='font-bold text-base'>
                            우대사항
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='space-y-2'>
                                {uniq(job.preferred).map((item) => (
                                    <li
                                        key={item}
                                        className='flex items-center gap-2'
                                    >
                                        <Checkbox
                                            checked={isChecked(
                                                job.preferredChecked,
                                                item,
                                            )}
                                            disabled
                                        />
                                        <p>{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                )}

                {uniq(job.benefits).length > 0 && (
                    <AccordionItem value='benefits'>
                        <AccordionTrigger className='font-bold text-base'>
                            문화 / 복리후생
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className='list-disc pl-5 space-y-2'>
                                {uniq(job.benefits).map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                )}
            </Accordion>

            <div className='mt-16'>
                <span className='font-bold text-base'>키워드</span>
                {uniq(job.tags).length > 0 && (
                    <div className='flex gap-1.5 pt-4'>
                        {uniq(job.tags).map((tag) => (
                            <Badge key={tag} variant='secondary'>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
