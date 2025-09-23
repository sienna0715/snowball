import { getCoverletter } from "@/service/coverletter";
import { redirect } from "next/navigation";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";
import { deleteCoverletter } from "../../../../../studio-hello-world/src/sanity/coverletter";

type Params = {
    slug: string
}

export const dynamic = "force-dynamic"; // 항상 요청 시 서버에서 렌더 되도록

export default async function CoverletterDetailPage({ params }: { params: Promise<Params> }) {
    const { slug } = await params;
    const coverletter = await getCoverletter(slug);

    if (!coverletter) {
        redirect('/app/coverletter');
    }

    return (
        <div className="py-10 mb-25">
            <div className="w-full mb-10 flex justify-between items-center">
                <Menubar className="w-max">
                    <MenubarMenu>
                        <MenubarTrigger>File</MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem>
                                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                            </MenubarItem>
                            <MenubarItem>New Window</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Share</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Print</MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>

                    <MenubarMenu>
                        <MenubarTrigger>Copy</MenubarTrigger>
                    </MenubarMenu>

                    <MenubarMenu>
                        <Link href={`/app/coverletter/${slug}/edit`}>
                            <MenubarTrigger>Edit</MenubarTrigger>
                        </Link>
                    </MenubarMenu>

                    <MenubarMenu>
                        <form action={deleteCoverletter}>
                            <input type="hidden" name="_id" value={coverletter._id} />
                            <MenubarTrigger asChild>
                                <button type="submit" className="w-full text-left">
                                    Delete
                                </button>
                            </MenubarTrigger>
                        </form>
                    </MenubarMenu>
                </Menubar>

                <span>Created {coverletter.date}</span>
            </div>
            <div>
                <h1 className="text-4xl">{coverletter.title}</h1>
                <p className="text-base/8 mt-8">{coverletter.content}</p>
            </div>
        </div>
    );
}