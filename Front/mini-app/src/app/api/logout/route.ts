// app/api/logout/route.ts
import { deleteCookie } from "@/lib/cookieUtil";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await deleteCookie("token");
  return NextResponse.json({ message: "Logout realizado com sucesso" });
}
