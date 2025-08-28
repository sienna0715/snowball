import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function ApplicationsCreatePage() {

    return (
        <div className="py-10 mb-25">
            <form className="flex flex-col gap-4 mb-16">
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">회사명</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">공고 링크</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-start">
                    <span className="min-w-25 pt-2">회사 소개</span>
                    <Textarea className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">위치</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">업종</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">업력</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">사원수</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">대표명</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">근무 형태</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">근무지</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">급여</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">참조</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">채용절차</span>
                    <Input className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-center">
                    <span className="min-w-25">채용절차</span>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </Label>
                <Label htmlFor="email" className="flex items-start">
                    <span className="min-w-25 pt-2">문화 / 복리후생</span>
                    <Textarea className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-start">
                    <span className="min-w-25 pt-2">담당업무</span>
                    <Textarea className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-start">
                    <span className="min-w-25 pt-2">자격요건</span>
                    <Textarea className="max-w-3xl" />
                </Label>
                <Label htmlFor="email" className="flex items-start">
                    <span className="min-w-25 pt-2">우대사항</span>
                    <Textarea className="max-w-3xl" />
                </Label>
            </form>
            <Button>
                <Save />
                저장하기
            </Button>
        </div>
    );
}