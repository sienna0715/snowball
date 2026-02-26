import "../globals.css";

export const metadata = {
    title: "Sign in - Snowball",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main className='w-full'>{children}</main>
}
