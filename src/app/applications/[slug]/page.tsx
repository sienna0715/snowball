import { getApplication, getApplications } from "@/service/applications";
import Link from "next/link";
import { redirect } from "next/navigation";

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

export default async function ApplicationsDtailPage({ params }: { params: Promise<{slug: string}>}) {
    const { slug } = await params;
    const application = await getApplication(slug);

    if (!application) {
        redirect('/applications');
    }

    return (
        <div className="py-10 mb-25">
            <div className="w-full flex flex-col gap-4 mb-4">
                <h1 className="text-4xl font-bold pb-4">(주) 동우</h1>
                <Link href="https://www.naver.com/">
                    <span>공고 링크</span>
                </Link>
                <p className="max-w-5xl">
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </p>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-bold">위치</TableCell>
                        <TableCell>경상북도 포항시</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">업종</TableCell>
                        <TableCell>설계</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">업력</TableCell>
                        <TableCell>50년차</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">사원수</TableCell>
                        <TableCell>30명</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">대표명</TableCell>
                        <TableCell>김영대</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]"></TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-bold">근무형태</TableCell>
                        <TableCell>정규직</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">근무지</TableCell>
                        <TableCell>경상북도 포항시 북구</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">급여</TableCell>
                        <TableCell>조정</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-bold">참조</TableCell>
                        <TableCell>Link</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className="my-16">
                <span className="font-bold">채용절차</span>
                <RecruitmentProcess steps={["서류 전형", "온라인 인적성", "면접", "결과"]} processStep="면접" />
            </div>

            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-bold text-base">문화 / 복리후생</AccordionTrigger>
                    <AccordionContent>
                        <li className="list-item">코드 리뷰 진행</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className="list-item">유연한 탄력근무제</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className="list-item">자기계발 지원 - 도서 구입, 자격증 취득, 교육 수강, 세미나/컨퍼런스 참여 기회 제공</li>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-bold text-base">담당업무</AccordionTrigger>
                    <AccordionContent className="flex items-center">
                        <li className="list-item">클라우드 기반 SaaS 웹 서비스의 프론트엔드 개발</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className="list-item">사용자 친화적인 UI/UX 구현</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className="list-item">반응형 웹 및 다양한 디바이스에 최적화된 화면 개발</li>
                    </AccordionContent>
                    <AccordionContent>
                        <li className="list-item">인터랙티브 차트 및 시각화 기능 개발 (차트/그래프 라이브러리 활용)</li>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-bold text-base">자격요건</AccordionTrigger>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">React 및 JavaScript에 대한 기본 이해</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">REST API 사용 경험 또는 이해</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">Git 등 형상관리 툴 사용 가능</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">문제를 스스로 파악하고 해결하려는 태도</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">협업 및 커뮤니케이션 능력</p>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                    <AccordionTrigger className="font-bold text-base">우대사항</AccordionTrigger>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">TypeScript 사용 경험</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">Next.js, Chart.js, D3.js 등 사용 경험</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">반응형 웹 개발 경험</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">팀 프로젝트 또는 개인 프로젝트 경험</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">기술 블로그 운영 또는 개발 관련 커뮤니티 활동</p>
                    </AccordionContent>
                    <AccordionContent className="flex items-center">
                        <Checkbox />
                        <p className="pl-2">기본적인 백엔드 이해 또는 Node.js 경험</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            <div className="mt-16">
                <span className="font-bold text-base">키워드</span>
                <div className="flex gap-1.5 pt-4">
                    <Badge asChild className="bg-secondary text-black">
                        <Link href="/">HTML</Link>
                    </Badge>
                    <Badge asChild className="bg-secondary text-black">
                        <Link href="/">TypeScript</Link>
                    </Badge>
                    <Badge asChild className="bg-secondary text-black">
                        <Link href="/">React</Link>
                    </Badge>
                    <Badge asChild className="bg-secondary text-black">
                        <Link href="/">Next.js</Link>
                    </Badge>
                </div>
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const applications = await getApplications();

    return applications.map((app) => ({
        slug: app.id,
    }));
}