import { cookies } from "next/headers";

/**
 * Next 서버 컴포넌트/서버 액션에서 API 호출용 cookie header 문자열 생성
 * 예: "session=...; other=..."
 */
export async function getCookieHeader() {
    const store = await cookies();
    return store
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");
}
