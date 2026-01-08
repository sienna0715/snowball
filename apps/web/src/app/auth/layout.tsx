// app/(auth)/layout.tsx  ← 서버 컴포넌트
import type { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
    title: "Sign in - Snowball",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className='w-full'>{children}</main>
}
