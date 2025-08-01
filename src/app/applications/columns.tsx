"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Application } from "@/service/applications";
import Link from "next/link";

export const columns: ColumnDef<Application>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div>
                <Checkbox
                    checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Company
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "workplace",
        header: "Workplace",
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("type")}</div>
        )
    },
    {
        accessorKey: "salary",
        header: () => <div className="text-right">Salary</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"))
            let formatted = new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(amount)

            if (!amount) {
                formatted = row.original.salary
            }
            
            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "date",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="text-center">{row.getValue("date")}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="flex justify-center">
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
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const submenu = row.original
        
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-5 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                        <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(submenu.id)}
                        >
                            <Link href={`/applications/${row.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]