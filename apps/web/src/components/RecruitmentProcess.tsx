import { JOB_STATUSES } from "@/lib/jobsType";

type JobStatus = (typeof JOB_STATUSES)[number];

const STATUS_LABEL: Record<
    Exclude<JobStatus, "BOOKMARK" | "REJECTED">,
    string
> = {
    APPLIED: "원서접수",
    INTERVIEW: "면접전형",
    OFFER: "최종합격",
};

const PROCESS_ORDER: Array<Exclude<JobStatus, "BOOKMARK" | "REJECTED">> = [
    "APPLIED",
    "INTERVIEW",
    "OFFER",
];

type ProcessProps = {
    status: JobStatus;
};

export default function RecruitmentProcess({ status }: ProcessProps) {
    // 북마크/불합격은 UI 표시 없음
    if (status === "BOOKMARK" || status === "REJECTED") return null;

    const currentIdx = PROCESS_ORDER.indexOf(status);

    return (
        <div className='w-max'>
            <div className='border-b relative top-15 -z-1' />
            <ul className='flex gap-4 mt-4'>
                {PROCESS_ORDER.map((s, idx) => {
                    const isCurrent = idx === currentIdx;
                    const isDone = idx < currentIdx;

                    return (
                        <li
                            key={s}
                            className={[
                                "min-w-36 p-7 border rounded-[50px] text-center",
                                isCurrent
                                    ? "bg-blue-500 text-white font-bold"
                                    : "bg-white",
                                isDone ? "opacity-80" : "",
                            ].join(" ")}
                        >
                            {STATUS_LABEL[s]}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
