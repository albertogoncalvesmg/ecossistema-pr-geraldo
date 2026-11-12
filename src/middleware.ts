import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME, UserRole } from "./lib/auth";

// Mapeamento de rotas restritas por papel específico dentro da Central Ministerial
const ROUTE_ROLE_GUARDS: Array<{ prefix: string; allowedRoles: UserRole[] }> = [
  {
    prefix: "/central/usuarios",
    allowedRoles: ["ADMIN"],
  },
  {
    prefix: "/central/aconselhamento",
    allowedRoles: ["ADMIN", "PASTOR", "PASTORAL"], // Equipe de comunicação bloqueada por LGPD
  },
  {
    prefix: "/central/estudio",
    allowedRoles: ["ADMIN", "PASTOR", "COMUNICACAO"],
  },
  {
    prefix: "/central/editor",
    allowedRoles: ["ADMIN", "PASTOR", "COMUNICACAO"],
  },
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/central")) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const session = await verifySessionToken(token);
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    for (const guard of ROUTE_ROLE_GUARDS) {
      if (
        pathname.startsWith(guard.prefix) &&
        !guard.allowedRoles.includes(session.role)
      ) {
        return NextResponse.redirect(
          new URL("/central?error=acesso_restrito_perfil", request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/central/:path*"],
};