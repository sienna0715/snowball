import { Calendar, Home, Inbox, NotebookPen, Settings } from "lucide-react"

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

// Menu items.
const items = [
    {
        title: "홈",
        url: "#",
        icon: Home,
    },
    {
        title: "내 지원 현황",
        url: "#",
        icon: Inbox,
    },
    {
        title: "자기소개서 관리",
        url: "#",
        icon: NotebookPen,
    },
    {
        title: "캘린더",
        url: "#",
        icon: Calendar,
    },
    {
        title: "설정",
        url: "#",
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
                        <SidebarMenuButton asChild>
                            <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                            </a>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}