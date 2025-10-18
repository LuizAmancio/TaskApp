import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { getCookie } from "@/lib/cookieUtil";

export async function GET() {
  const token = await getCookie("token");

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      name: payload.name,
      email: payload.sub,
      userId: payload.id,
      roles: payload.roles || [],
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
