
type Process = {
    steps: string[];
    status: string;
}

export default function RecruitmentProcess({ steps, status }: Process) {
    const processStep = status

    return (
        <div className="w-max">
            <div className="border-b relative top-15 -z-1"></div>
            <ul className="flex gap-4 mt-4">
                {steps.map((step) => (
                    <li 
                        key={step}
                        className={`min-w-36 p-7 border rounded-[50px] text-center 
                            ${processStep === step ? "bg-blue-500 text-white font-bold" : "bg-white"}`}>
                        {step}
                    </li>
                ))}
            </ul>
        </div>
    );
}