import { redirect } from "next/navigation";
import { signIn, providerMap } from "../../../../auth";
import { AuthError } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage(props: {
    searchParams: Promise<{ callbackUrl?: string | string[] }>;
}) {
    const { callbackUrl } = await props.searchParams;
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
            <Link href='/'>
                <Image src={"/logo.png"} width={240} height={37} alt='Logo' />
            </Link>

            <p className='text-[var(--color-primary)] font-bold'>
                너의 노력도 굴리기 시작하면 멈출 수 없듯이
            </p>

            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    className='mt-10'
                    action={async () => {
                        "use server";
                        try {
                            await signIn(provider.id, {
                                redirectTo: Array.isArray(callbackUrl)
                                    ? callbackUrl[0]
                                    : callbackUrl || "/",
                            });
                        } catch (error) {
                            // Signin can fail for a number of reasons, such as the user
                            // not existing, or the user not having the correct role.
                            // In some cases, you may want to redirect to a custom error
                            if (error instanceof AuthError) {
                                return redirect(
                                    `${SIGNIN_ERROR_URL}?error=${error.type}`
                                );
                            }

                            // Otherwise if a redirects happens Next.js can handle it
                            // so you can just re-thrown the error and let Next.js handle it.
                            // Docs:
                            // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                            throw error;
                        }
                    }}
                >
                    <button
                        type='submit'
                        className='w-[400] flex justify-center items-center gap-2 border rounded-sm px-5 py-3 cursor-pointer'
                    >
                        <Image
                            src={"/google-icon.png"}
                            width={16}
                            height={16}
                            alt='Google'
                        />
                        <span className='font-semibold'>
                            {" "}
                            {provider.name} 계정으로 계속하기
                        </span>
                    </button>
                </form>
            ))}
        </div>
    );
}
