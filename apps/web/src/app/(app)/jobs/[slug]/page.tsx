import Link from "next/link";
import { redirect, notFound } from "next/navigation";
import { getCookieHeader } from "@/lib/cookies";
import { getJob } from "@/lib/jobs";
import { deleteJobAction } from "../actions";

/** shadcn */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import RecruitmentProcess from "@/components/RecruitmentProcess";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar";

type JobProps = {
    params: { slug: string };
};

export const dynamic = "force-dynamic";

function parseJobId(slug: string) {
    const n = Number(slug);
    if (!Number.isInteger(n) || n <= 0) return null;
    return n;
}

export default async function JobDetailPage({ params }: JobProps) {
    const { slug } = params;
    const jobId = parseJobId(slug);
    if (!jobId) redirect("/jobs");

    const cookieHeader = await Promise.resolve(getCookieHeader());

    let job: Awaited<ReturnType<typeof getJob>> | null = null;
    try {
        job = await getJob(jobId, { cookie: cookieHeader });
    } catch {
        job = null;
    }

    if (!job) notFound();

    const companyRows: Array<{ label: string; value: unknown }> = [
        { label: "위치", value: job.location },
        { label: "업종", value: job.industry },
        { label: "업력", value: job.year },
        { label: "사원수", value: job.employees },
        { label: "대표명", value: job.ceo },
    ];

    const workRows: Array<{ label: string; value: unknown }> = [
        { label: "근무형태", value: job.employmentType },
        { label: "근무지", value: job.workLocation },
        { label: "급여", value: job.salary },
    ];

    return (
        <div className='py-10 mb-25'>
            <Menubar className='w-max'>
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
                    <Link href={`/jobs/${job.id}/edit`}>
                        <MenubarTrigger>Edit</MenubarTrigger>
                    </Link>
                </MenubarMenu>

                <MenubarMenu>
                    <form action={deleteJobAction.bind(null, job.id)}>
                        <input type='hidden' name='_id' value={job.id} />
                        <MenubarTrigger asChild>
                            <button type='submit' className='w-full text-left'>
                                Delete
                            </button>
                        </MenubarTrigger>
                    </form>
                </MenubarMenu>
            </Menubar>

            <div className='w-full flex flex-col gap-4 mb-4 mt-8'>
                <h1 className='text-4xl font-bold pb-4'>{job.companyName}</h1>

                {job.jobUrl ? (
                    <Link
                        href={job.jobUrl}
                        target='_blank'
                        rel='noreferrer'
                        className='underline underline-offset-4 w-fit'
                    >
                        공고 링크
                    </Link>
                ) : null}

                {job.companyIntro ? (
                    <p className='w-full max-w-5xl'>{job.companyIntro}</p>
                ) : null}
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companyRows.map(({ label, value }) => (
                        <TableRow key={label}>
                            <TableCell className='font-bold'>{label}</TableCell>
                            <TableCell>{String(value ?? "-")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {workRows.map(({ label, value }) => (
                        <TableRow key={label}>
                            <TableCell className='font-bold'>{label}</TableCell>
                            <TableCell>{String(value ?? "-")}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell className='font-bold'>참조</TableCell>
                        <TableCell>
                            {job.other ? (
                                <pre className='whitespace-pre-wrap text-sm'>
                                    {JSON.stringify(job.other, null, 2)}
                                </pre>
                            ) : (
                                "-"
                            )}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className='my-16'>
                <span className='font-bold'>채용절차</span>
                <RecruitmentProcess
                    steps={["원서접수", "면접전형", "최종합격"]}
                    status={job.status}
                />
            </div>

            <Accordion type='multiple'>
                <AccordionItem value='item-1'>
                    <AccordionTrigger className='font-bold text-base'>
                        문화 / 복리후생
                    </AccordionTrigger>
                    <AccordionContent>
                        <li className='list-item'>코드 리뷰 진행</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className='list-item'>유연한 탄력근무제</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className='list-item'>
                            자기계발 지원 - 도서 구입, 자격증 취득, 교육 수강,
                            세미나/컨퍼런스 참여 기회 제공
                        </li>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-2'>
                    <AccordionTrigger className='font-bold text-base'>
                        담당업무
                    </AccordionTrigger>
                    <AccordionContent className='flex items-center'>
                        <li className='list-item'>
                            클라우드 기반 SaaS 웹 서비스의 프론트엔드 개발
                        </li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className='list-item'>
                            사용자 친화적인 UI/UX 구현
                        </li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className='list-item'>
                            반응형 웹 및 다양한 디바이스에 최적화된 화면 개발
                        </li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className='list-item'>
                            인터랙티브 차트 및 시각화 기능 개발 (차트/그래프
                            라이브러리 활용)
                        </li>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-3'>
                    <AccordionTrigger className='font-bold text-base'>
                        자격요건
                    </AccordionTrigger>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            React 및 JavaScript에 대한 기본 이해
                        </p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>REST API 사용 경험 또는 이해</p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>Git 등 형상관리 툴 사용 가능</p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            문제를 스스로 파악하고 해결하려는 태도
                        </p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>협업 및 커뮤니케이션 능력</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value='item-4'>
                    <AccordionTrigger className='font-bold text-base'>
                        우대사항
                    </AccordionTrigger>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>TypeScript 사용 경험</p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            Next.js, Chart.js, D3.js 등 사용 경험
                        </p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>반응형 웹 개발 경험</p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            팀 프로젝트 또는 개인 프로젝트 경험
                        </p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            기술 블로그 운영 또는 개발 관련 커뮤니티 활동
                        </p>
                    </AccordionContent>
                    <AccordionContent className='flex items-center'>
                        <Checkbox />
                        <p className='pl-2'>
                            기본적인 백엔드 이해 또는 Node.js 경험
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className='mt-16'>
                <span className='font-bold text-base'>키워드</span>
                <div className='flex gap-1.5 pt-4'>
                    <Badge asChild className='bg-secondary text-black'>
                        <Link href='/'>HTML</Link>
                    </Badge>
                    <Badge asChild className='bg-secondary text-black'>
                        <Link href='/'>TypeScript</Link>
                    </Badge>
                    <Badge asChild className='bg-secondary text-black'>
                        <Link href='/'>React</Link>
                    </Badge>
                    <Badge asChild className='bg-secondary text-black'>
                        <Link href='/'>Next.js</Link>
                    </Badge>
                </div>
            </div>
        </div>
    );
}
