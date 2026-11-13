"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/central", label: "Dashboard Operacional", badge: "MÓDULO 2" },
  { href: "/central/editor", label: "Editor Inteligente & Aprovação", badge: "MÓDULO 2" },
  { href: "/central/redes", label: "Central de Redes Sociais", badge: "MÓDULO 2" },
  { href: "/central/whatsapp", label: "WhatsApp Ministerial", badge: "MÓDULO 2" },
  { href: "/central/calendario", label: "Calendário Editorial", badge: "MÓDULO 2" },
  { href: "/central/aconselhamento", label: "Aconselhamento Pastoral (LGPD)", badge: "SIGILO PASTORAL" },
  { href: "/central/estudio", label: "Estúdio GA & Teleprompter", badge: "MÓDULO 3" },
  { href: "/central/arquivo-vivo", label: "Arquivo Vivo GA (Acervo & IA)", badge: "MÓDULO 4" },
  { href: "/central/portal-admin", label: "Gestão do Portal", badge: "ADMIN" },
  { href: "/central/usuarios", label: "Equipe e Acessos", badge: "ADMIN" },
];

export default function CentralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col lg:flex-row">
      {/* CABEÇALHO MOBILE (Aparece só no celular, liberando 100% da tela para o conteúdo) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0A192F] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-[#C5A059]/30">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-[#C5A059] text-[#C5A059] rounded-sm">
            PASTOR
          </span>
          <span className="font-editorial font-bold text-sm">
            Central Ministerial
          </span>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu de módulos"
          className="px-3 py-1.5 rounded bg-[#C5A059] text-[#0A192F] text-xs font-bold uppercase tracking-wider active:scale-95 transition"
        >
          {mobileMenuOpen ? "Fechar ✕" : "Módulos ☰"}
        </button>
      </header>

      {/* FUNDO ESCURO AO ABRIR MENU NO CELULAR */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* BARRA AZUL LATERAL (Gaveta no celular / Fixa no computador) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 sm:w-80 bg-[#0A192F] text-white flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-[#C5A059] text-[#C5A059] rounded-sm">
                PASTOR
              </span>
              <h2 className="font-editorial text-lg font-bold text-white mt-2">
                Central Ministerial GA
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-2 text-lg"
            >
              ✕
            </button>
          </div>

          <nav className="p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/central"
                  ? pathname === "/central"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between gap-2 px-3.5 py-3 rounded-sm text-xs sm:text-sm transition ${
                    isActive
                      ? "bg-[#C5A059] text-[#0A192F] font-semibold"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="leading-snug">{item.label}</span>
                  <span
                    className={`text-[9px] uppercase tracking-wider font-semibold shrink-0 ${
                      isActive ? "text-[#0A192F]/80" : "text-white/40"
                    }`}
                  >
                    {item.badge}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center px-4 py-2.5 text-xs uppercase tracking-wider border border-white/20 text-white/90 hover:bg-white/10 rounded-sm"
          >
            Ver Portal Público ↗
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-xs uppercase tracking-wider bg-red-950/70 text-red-200 hover:bg-red-900 rounded-sm transition"
          >
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO (100% da largura no celular) */}
      <main className="flex-1 w-full min-w-0 px-4 py-5 sm:px-6 lg:px-10 lg:py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}