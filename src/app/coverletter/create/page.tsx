import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";


export default function CoverletterCreatePage() {

    return (
        <div className="py-10 mb-25 flex flex-col gap-8">
            <div className="w-max h-10 fixed top-5 right-15 flex justify-end">
                <ToggleGroup variant="outline" type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold">
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic">
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
                        <Underline className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div>
                <Label className="text-base pb-4">Title</Label>
                <Input />
            </div>
            <Textarea className="h-screen" />
            <Button>저장하기</Button>
        </div>
    );
}