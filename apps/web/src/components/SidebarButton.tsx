"use client"

import { usePathname } from "next/navigation";

type SidebarItem = {
    title: string;
    url: string;
}; 

export default function SidebarButton({ title, url }: SidebarItem ) {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isActive = url === '/' ? isHome : pathname.includes(url);

    return (
        <span className={isActive ? 'font-bold' : 'font-normal'}>{title}</span>
    );
}