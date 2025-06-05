'use client';

import { Calendar, Home, Inbox, NotebookPen, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import SidebarButton from "../SidebarButton"

// Menu items.
const items = [
    {
        title: "홈",
        url: "/",
        icon: Home,
    },
    {
        title: "내 지원 현황",
        url: "/applications",
        icon: Inbox,
    },
    {
        title: "자기소개서 관리",
        url: "/coverletter",
        icon: NotebookPen,
    },
    {
        title: "캘린더",
        url: "/calendar",
        icon: Calendar,
    },
    {
        title: "설정",
        url: "/setting",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className="px-12 py-5">
                <Link href="/">
                    <Image src={'/logo.png'} width={240} height={37} alt="Logo" />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild id={item.url.replace("/", "")}>
                                <a href={item.url}>
                                    <item.icon />
                                    <SidebarButton title={item.title} url={item.url} />
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="w-full p-2 mb-2">
                <div className="w-full flex flex-row items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent">
                    <div className="p-2 bg-gray-300 rounded-lg">
                        <User />
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <span>반짝이는 워터멜론</span>
                        <span className="text-xs">watermelone@gmail.com</span>
                    </div>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}