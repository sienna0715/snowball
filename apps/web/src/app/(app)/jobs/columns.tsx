"use client";

import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

import type { Job } from "@/lib/jobsType";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Job>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label='Select all'
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className='flex justify-center'>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "companyName",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    회사명
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => {
            const job = row.original;

            return (
                <Link href={`/jobs/${encodeURIComponent(String(job.id))}`}>
                    {job.companyName || "-"}
                </Link>
            );
        },
    },
    {
        accessorKey: "workLocation",
        header: "근무지",
        cell: ({ row }) => (
            <div className='text-center'>
                {row.getValue("workLocation") || "-"}
            </div>
        ),
    },
    {
        accessorKey: "employmentType",
        header: "근무형태",
        cell: ({ row }) => {
            const value = row.getValue("employmentType") as string | undefined;

            const EMPLOYMENT_TYPE_LABEL: Record<string, string> = {
                FULL_TIME: "정규직",
                CONTRACT: "계약직",
                INTERN: "인턴",
                PART_TIME: "파트타임",
            };

            return (
                <div className='text-center'>
                    {value ? (EMPLOYMENT_TYPE_LABEL[value] ?? value) : "-"}
                </div>
            );
        },
    },
    // {
    //     accessorKey: "salary",
    //     header: () => <div className='text-center'>급여</div>,
    //     cell: ({ row }) => {
    //         const raw = row.original.salary;

    //         if (raw === null || raw === undefined || raw === "") {
    //             return <div className='text-right font-medium'>-</div>;
    //         }

    //         const value = typeof raw === "number" ? String(raw) : String(raw);
    //         const amount = Number(value.replace(/,/g, ""));

    //         // 숫자로 변환 가능하면 통화 포맷 적용
    //         if (!Number.isNaN(amount)) {
    //             const formatted = new Intl.NumberFormat("ko-KR", {
    //                 style: "currency",
    //                 currency: "KRW",
    //             }).format(amount);

    //             return (
    //                 <div className='text-right font-medium'>{formatted}</div>
    //             );
    //         }
    //         const fallback =
    //             typeof raw === "object" ? JSON.stringify(raw) : String(raw);
    //         return <div className='text-right font-medium'>{fallback}</div>;
    //     },
    // },
    {
        accessorKey: "deadline",
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    마감일
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.getValue("deadline") as string | null | undefined;

            if (!value) {
                return <div className='text-center'>-</div>;
            }

            const d = new Date(value);
            if (Number.isNaN(d.getTime())) {
                return <div className='text-center'>-</div>;
            }

            const formatted = d.toISOString().slice(0, 10);

            return <div className='text-center'>{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "채용상태",
        cell: ({ row }) => {
            const status = row.getValue("status") as string | undefined;

            const STATUS_LABEL: Record<string, string> = {
                APPLIED: "원서접수",
                INTERVIEW: "면접전형",
                OFFER: "최종합격",
                BOOKMARK: "북마크",
                REJECTED: "불합격",
            };

            const label = status ? (STATUS_LABEL[status] ?? status) : "-";

            const badgeClass =
                status === "OFFER"
                    ? "bg-green-500"
                    : status === "BOOKMARK"
                        ? "bg-yellow-400 text-black"
                        : status === "REJECTED"
                            ? "bg-gray-400"
                            : "bg-blue-500";
            return (
                <div className='flex justify-center'>
                    <span
                        className={[
                            "text-white rounded-sm px-2 py-0.5 font-bold",
                            badgeClass,
                        ].join(" ")}
                    >
                        {label}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const job = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-5 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(String(job.id))
                            }
                        >
                            <Link
                                href={`/jobs/${encodeURIComponent(String(job.id))}`}
                            >
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
