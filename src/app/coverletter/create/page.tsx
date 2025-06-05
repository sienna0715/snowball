import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


export default function CoverletterCreatePage() {

    return (
        <div className="py-10 mb-25 flex flex-col gap-8">
            <div>
                <Label className="text-base pb-4">Title</Label>
                <Input />
            </div>
            <Textarea className="h-screen" />
            <Button>저장하기</Button>
        </div>
    );
}