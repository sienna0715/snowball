// app/(auth)/layout.tsx  ← 서버 컴포넌트
import type { Metadata } from "next";
import AuthContext from "@/context/AuthContext";
import "../globals.css";

export const metadata: Metadata = {
    title: "Sign in - Snowball",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthContext>
            <main className='w-full'>{children}</main>
        </AuthContext>
    );
}
