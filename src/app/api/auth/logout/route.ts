import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, getCurrentSession } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";

export async function POST() {
  const session = await getCurrentSession();
  if (session) {
    await recordAuditLog({
      userId: session.userId,
      action: "LOGOUT",
      module: "AUTH",
    });
  }

  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
  );
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}