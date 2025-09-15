"use client";

import { ColumnDef } from "@tanstack/react-table";
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

type Job = {
    _id: string;
    _createdAt: string;
    slug?: { current?: string };
    company: string;
    workLocation?: string;
    employmentType?: string;
    salary: string;
    deadline: string;
    status: string;
}

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
        accessorKey: "company",
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
            const slugOrId = job.slug?.current || job._id;

            // console.log("[JobRow]", job._id, job.slug?.current);

            return (
                <Link
                    href={`/app/job/${encodeURIComponent(slugOrId)}`}
                    className='underline'
                >
                    {job.company || "-"}
                </Link>
            );
        },
    },
    {
        accessorKey: "workLocation",
        header: "근무지",
    },
    {
        accessorKey: "employmentType",
        header: "근무형태",
        cell: ({ row }) => (
            <div className='text-center'>{row.getValue("employmentType")}</div>
        ),
    },
    {
        accessorKey: "salary",
        header: () => <div className='text-center'>급여</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"));
            let formatted = new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(amount);

            if (!amount) {
                formatted = row.original.salary;
            }

            return <div className='text-right font-medium'>{formatted}</div>;
        },
    },
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
        cell: ({ row }) => (
            <div className='text-center'>{row.getValue("deadline")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className='flex justify-center'>
                <span
                    className={`
                    text-white rounded-sm px-2 py-0.5 font-bold
                    ${
                        row.getValue("status") === "최종 합격"
                            ? "bg-red-500"
                            : row.getValue("status") === "불합격"
                            ? "bg-gray-400"
                            : "bg-blue-500"
                    }
                    `}
                >
                    {row.getValue("status")}
                </span>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const submenu = row.original;

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
                                navigator.clipboard.writeText(submenu._id)
                            }
                        >
                            <Link href={`/app/job/${row.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
