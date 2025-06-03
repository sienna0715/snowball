"use client"

import { usePathname } from "next/navigation";

type SidebarItem = {
    title: string;
    url: string;
}; 

export default function SidebarButton({ title, url }: SidebarItem ) {
    const pathname = usePathname();

    return (
        <span className={pathname == url ? 'font-bold' : ''}>{title}</span>
    );
}