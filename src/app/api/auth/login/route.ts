import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/crypto";
import { createSessionToken, SESSION_COOKIE_NAME, UserRole } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "Senha obrigatória."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Credenciais em formato inválido." },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const ipAddress =
      request.headers.get("x-forwarded-for") || "127.0.0.1";

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      await recordAuditLog({
        action: "LOGIN_FAILED_USER_NOT_FOUND_OR_INACTIVE",
        module: "AUTH",
        metadata: { attemptedEmail: email },
        ipAddress,
      });

      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      await recordAuditLog({
        userId: user.id,
        action: "LOGIN_FAILED_INVALID_PASSWORD",
        module: "AUTH",
        ipAddress,
      });

      return NextResponse.json(
        { error: "E-mail ou senha incorretos." },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await createSessionToken({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role as UserRole,
    });

    await recordAuditLog({
      userId: user.id,
      action: "LOGIN_SUCCESS",
      module: "AUTH",
      metadata: { role: user.role },
      ipAddress,
    });

    const response = NextResponse.json({
      authenticated: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12, // 12 horas
    });

    return response;
  } catch (error) {
    console.error("Erro no endpoint de autenticação:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar autenticação." },
      { status: 500 }
    );
  }
}