import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentSession, hasPermission } from "@/lib/auth";
import { GaBadge } from "@/components/ui/ga-primitives";

export default async function CentralMinisterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/login");
  }

  const navigationItems = [
    {
      label: "Dashboard Operacional",
      href: "/central",
      visible: hasPermission(session.role, "dashboard:view"),
      moduleTag: "Módulo 2",
    },
    {
      label: "Editor Inteligente & Aprovação",
      href: "/central/editor",
      visible: hasPermission(session.role, "content:create"),
      moduleTag: "Módulo 2",
    },
    {
      label: "Central de Redes Sociais",
      href: "/central/redes-sociais",
      visible: hasPermission(session.role, "social:manage"),
      moduleTag: "Módulo 2",
    },
    {
      label: "WhatsApp Ministerial",
      href: "/central/whatsapp",
      visible:
        hasPermission(session.role, "whatsapp:manage") ||
        hasPermission(session.role, "whatsapp:prepare") ||
        hasPermission(session.role, "whatsapp:pastoral"),
      moduleTag: "Módulo 2",
    },
    {
      label: "Calendário Editorial",
      href: "/central/calendario",
      visible: hasPermission(session.role, "dashboard:view"),
      moduleTag: "Módulo 2",
    },
    {
      label: "Aconselhamento Pastoral (LGPD)",
      href: "/central/aconselhamento",
      visible: hasPermission(session.role, "counseling:view"),
      moduleTag: "Sigilo Pastoral",
    },
    {
      label: "Estúdio GA & Teleprompter",
      href: "/central/estudio",
      visible: hasPermission(session.role, "studio:manage"),
      moduleTag: "Módulo 3",
    },
    {
      label: "Arquivo Vivo GA (Acervo & IA)",
      href: "/central/arquivo-vivo",
      visible:
        hasPermission(session.role, "archive:manage") ||
        hasPermission(session.role, "archive:view"),
      moduleTag: "Módulo 4",
    },
    {
      label: "Usuários, Permissões & Auditoria",
      href: "/central/usuarios",
      visible: hasPermission(session.role, "users:manage"),
      moduleTag: "Segurança",
    },
  ];

  return (
    <div className="min-h-screen flex bg-ga-ivory">
      {/* Menu Lateral Institucional */}
      <aside className="w-72 bg-ga-navy text-white flex flex-col justify-between shrink-0 border-r border-ga-gold/30">
        <div>
          <div className="p-6 border-b border-ga-navy-light">
            <span className="text-xs uppercase tracking-widest text-ga-gold block">
              Projeto GA
            </span>
            <h2 className="text-xl font-editorial font-bold mt-1">
              Central Ministerial
            </h2>
            <div className="mt-3 flex items-center gap-2">
              <GaBadge variant="gold">{session.role}</GaBadge>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {navigationItems
              .filter((item) => item.visible)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between px-3.5 py-2.5 text-sm text-ga-ivory/90 hover:bg-ga-navy-light hover:text-white rounded-sm transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase tracking-wider text-ga-gold-light opacity-80">
                    {item.moduleTag}
                  </span>
                </Link>
              ))}
          </nav>
        </div>

        <div className="p-5 border-t border-ga-navy-light bg-ga-navy-dark">
          <p className="text-xs text-ga-ivory/80 font-medium truncate">
            {session.name}
          </p>
          <p className="text-[11px] text-ga-ivory/60 truncate mb-3">
            {session.email}
          </p>
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="text-xs text-ga-gold-light hover:underline"
            >
              Ver Portal Público
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="text-xs text-red-300 hover:text-red-200 underline"
              >
                Encerrar Sessão
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Área Principal de Trabalho */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-ga-slate-light px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-ga-slate">
              Organizar o presente, ampliar o alcance e preservar o legado
            </p>
          </div>
          <div className="flex items-center gap-3">
            <GaBadge variant="navy">Fundação Fase 1 Ativa</GaBadge>
          </div>
        </header>

        <main className="p-8 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}