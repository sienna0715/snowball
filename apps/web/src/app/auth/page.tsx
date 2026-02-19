"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { fetchAuthProviders, type AuthProvider } from "@/lib/api";

function makeRedirectParam() {
    return encodeURIComponent(window.location.origin);
}

export default function SignInPage() {
    const [providers, setProviders] = useState<AuthProvider[]>([]);
    const [loading, setLoading] = useState(true);

    const iconById = useMemo<Record<string, string>>(
        () => ({
            google: "/google-icon.png",
            kakao: "/kakao-icon.png",
            github: "/github-icon.png",
        }),
        [],
    );

    useEffect(() => {
        async function load() {
            try {
                const data = await fetchAuthProviders();
                setProviders(data);
            } catch {
                setProviders([]);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const handleLogin = (providerId: string) => {
        const redirect = makeRedirectParam();
        window.location.href = `/api/auth/${providerId}/login?redirect=${redirect}`;
    };

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
            <Link href='/'>
                <Image src={"/logo.png"} width={240} height={37} alt='Logo' />
            </Link>

            <p className='text-[var(--color-primary)] font-bold'>
                너의 노력도 굴리기 시작하면 멈출 수 없듯이
            </p>

            <div className='mt-10 flex flex-col gap-3'>
                {loading ? (
                    <div className='w-[400] flex justify-center items-center border rounded-sm px-5 py-3 opacity-70'>
                        불러오는 중...
                    </div>
                ) : providers.length === 0 ? (
                    <div className='w-[400] flex justify-center items-center border rounded-sm px-5 py-3 opacity-70'>
                        현재 사용 가능한 로그인 수단이 없습니다.
                    </div>
                ) : (
                    providers.map((provider) => (
                        <button
                            key={provider.id}
                            type='button'
                            onClick={() => handleLogin(provider.id)}
                            className='w-[400] flex justify-center items-center gap-2 border rounded-sm px-5 py-3 cursor-pointer'
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={iconById[provider.id] ?? "/oauth-icon.png"}
                                width={16}
                                height={16}
                                alt={provider.displayName}
                            />
                            <span className='font-semibold'>
                                {provider.displayName} 계정으로 계속하기
                            </span>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}
