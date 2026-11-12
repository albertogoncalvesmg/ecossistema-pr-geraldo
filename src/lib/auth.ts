import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type UserRole = "ADMIN" | "PASTOR" | "COMUNICACAO" | "PASTORAL";

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  expiresAt: string;
}

export const SESSION_COOKIE_NAME = "ga_ministerial_session";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret || secret.length < 32) {
    throw new Error(
      "ERRO CRÍTICO: Variável JWT_SECRET_KEY não configurada ou menor que 32 caracteres."
    );
  }
  return new TextEncoder().encode(secret);
}

/**
 * Matriz de Controle de Acesso Baseado em Função (RBAC) — Princípio do Menor Privilégio
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  ADMIN: [
    "dashboard:view",
    "users:manage",
    "integrations:manage",
    "content:create",
    "content:approve",
    "content:publish",
    "social:manage",
    "social:approve",
    "whatsapp:manage",
    "studio:manage",
    "archive:manage",
    "archive:restricted",
    "counseling:view",
  ],
  PASTOR: [
    "dashboard:view",
    "content:create",
    "content:approve",
    "content:publish",
    "social:manage",
    "social:approve",
    "whatsapp:manage",
    "studio:manage",
    "archive:manage",
    "archive:restricted",
    "counseling:view",
  ],
  COMUNICACAO: [
    "dashboard:view",
    "content:create",
    "social:manage",
    "whatsapp:prepare",
    "studio:manage",
    "archive:view",
  ],
  PASTORAL: [
    "dashboard:view",
    "counseling:view",
    "counseling:manage",
    "whatsapp:pastoral",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const allowed = ROLE_PERMISSIONS[role] || [];
  return allowed.includes(permission);
}

export async function createSessionToken(
  payload: Omit<SessionPayload, "expiresAt">
): Promise<string> {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 12).toISOString(); // 12 horas
  return new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getJwtSecret());
}

export async function verifySessionToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}