// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Main() {
  redirect("/app"); // "/" 요청 들어오면 "/app"으로 보냄
}