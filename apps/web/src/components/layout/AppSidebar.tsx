"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Inbox, NotebookPen, Settings, User, LogOut } from "lucide-react";

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

import { getMe } from "@/lib/user"; // ✅ 공용코드 사용 (auth/me)
import { apiFetch } from "@/lib/api";

const items = [
    {
        title: "홈",
        url: "/",
        icon: Home,
    },
    {
        title: "내 지원 현황",
        url: "/jobs",
        icon: Inbox,
    },
    {
        title: "자기소개서 관리",
        url: "/coverletters",
        icon: NotebookPen,
    },
    {
        title: "설정",
        url: "/settings",
        icon: Settings,
    },
];

type User = {
    id: number;
    email: string;
    name?: string | null;
    picture?: string | null;
};

export function AppSidebar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let mounted = true;

        async function load() {
            try {
                const me = await getMe();
                if (mounted) setUser(me);
            } catch {
                if (mounted) setUser(null);
            }
        }

        load();
        return () => {
            mounted = false;
        };
    }, []);

    async function handleLogout() {
        try {
            await apiFetch<void>("/api/auth/logout", {
                method: "POST",
            });
        } finally {
            setUser(null);
            router.refresh();
        }
    }

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
                                        <Link href={item.url}>
                                            <item.icon />
                                            <SidebarButton
                                                title={item.title}
                                                url={item.url}
                                            />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className='w-full p-2 mb-2'>
                {user && (
                    <div className='w-full flex flex-row items-center gap-2 p-2 rounded-md hover:bg-sidebar-accent'>
                        <div className='w-12 h-12 bg-gray-300 rounded-lg overflow-hidden flex justify-center items-center'>
                            {user.picture ? (
                                <Image
                                    src={user.picture}
                                    alt={user.name ?? ""}
                                    width={48}
                                    height={48}
                                    className='w-full h-full object-cover'
                                    referrerPolicy='no-referrer'
                                />
                            ) : (
                                <User />
                            )}
                        </div>
                        <div className='flex flex-col gap-1 text-sm'>
                            <span>{user.name ?? ""}</span>
                            <span className='text-xs'>{user.email}</span>
                        </div>
                        <button
                            type='button'
                            className='cursor-pointer'
                            onClick={handleLogout}
                        >
                            <LogOut className='w-5 h-5 ml-2 text-gray-600' />
                        </button>
                    </div>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
