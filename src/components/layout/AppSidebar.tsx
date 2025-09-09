"use client";

import {
    Calendar,
    Home,
    Inbox,
    NotebookPen,
    Settings,
    User,
    LogOut,
} from "lucide-react";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import SidebarButton from "../SidebarButton";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";

// Menu items.
const items = [
    {
        title: "홈",
        url: "/",
        icon: Home,
    },
    {
        title: "내 지원 현황",
        url: "/app/job",
        icon: Inbox,
    },
    {
        title: "자기소개서 관리",
        url: "/app/coverletter",
        icon: NotebookPen,
    },
    {
        title: "캘린더",
        url: "/app/calendar",
        icon: Calendar,
    },
    {
        title: "설정",
        url: "/app/setting",
        icon: Settings,
    },
];

export function AppSidebar() {
    const { data: session } = useSession();
    const user = session?.user;

    return (
        <Sidebar>
            <SidebarHeader className='px-12 py-5'>
                <Link href='/'>
                    <Image
                        src={"/logo.png"}
                        width={240}
                        height={37}
                        alt='Logo'
                    />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        id={item.url.replace("/", "")}
                                    >
                                        <a href={item.url}>
                                            <item.icon />
                                            <SidebarButton
                                                title={item.title}
                                                url={item.url}
                                            />
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='w-full p-2 mb-2'>
                {session ? (
                    <div className='w-full flex flex-row items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent'>
                        <div className='w-12 h-12 bg-gray-300 rounded-lg overflow-hidden flex justify-center items-center'>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {user && user.image ? <img src={user.image} alt={user?.name ?? ""} /> : <User />}
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span>{user && user.name}</span>
                            <span className='text-xs'>{user && user.email}</span>
                        </div>
                        <button
                            type='button'
                            className='cursor-pointer'
                            onClick={() => signOut()}
                        >
                            <LogOut className='w-5 h-5 ml-2 text-gray-600' />
                        </button>
                    </div>
                ) : (
                    <Link href='/auth/signin'>
                        <Button
                            type='submit'
                            variant='default'
                            className='w-full flex items-center'
                        >
                            <span>로그인</span>
                        </Button>
                    </Link>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
