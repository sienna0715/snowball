import { Button } from "@/components/ui/button";
import Link from "next/link";

type PrimaryButtonProps = {
    text: string
}

export default function PrimaryButton({text}: PrimaryButtonProps) {
    return (
        <Button>
            <Link href="/">{text}</Link>
        </Button>
    );
}