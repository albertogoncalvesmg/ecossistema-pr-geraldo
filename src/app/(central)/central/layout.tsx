"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/central", label: "Visão Geral", icon: "📊" },
  { href: "/central/estudio", label: "Estúdio GA & IA", icon: "✍️" },
  { href: "/central/aconselhamento", label: "Aconselhamento (LGPD)", icon: "🙏" },
  { href: "/central/arquivo-vivo", label: "Arquivo Vivo GA", icon: "📚" },
  { href: "/central/portal-admin", label: "Gestão do Portal", icon: "🌐" },
  { href: "/central/usuarios", label: "Equipe e Acessos", icon: "🔐" },
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
      {/* CABEÇALHO MOBILE (Visível apenas em celulares e tablets) */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#0A192F] text-white px-4 py-3 flex items-center justify-between shadow-md border-b border-[#C5A059]/30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#C5A059] text-[#0A192F] font-editorial font-bold flex items-center justify-center text-sm">
            GA
          </div>
          <div>
            <p className="font-editorial font-bold text-sm leading-tight">
              Central Ministerial
            </p>
            <p className="text-[10px] text-[#C5A059] uppercase tracking-wider">
              Pr. Geraldo Afonso
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menu"
          className="p-2 rounded bg-white/10 text-white hover:bg-white/20 active:scale-95 transition"
        >
          {mobileMenuOpen ? (
            <span className="text-lg font-bold px-1">✕</span>
          ) : (
            <span className="text-lg font-bold px-1">☰</span>
          )}
        </button>
      </header>

      {/* OVERLAY ESCURO NO MOBILE QUANDO O MENU ESTÁ ABERTO */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR / GAVETA RESPONSIVA */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A192F] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Topo da Sidebar */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                Ecossistema Digital
              </span>
              <h2 className="font-editorial text-xl font-bold text-white mt-0.5">
                Central GA
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-white/70 hover:text-white p-1"
            >
              ✕
            </button>
          </div>

          {/* Links de Navegação com Área de Toque Ampliada (py-3.5) */}
          <nav className="p-4 space-y-1.5">
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
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-sm text-sm font-medium transition ${
                    isActive
                      ? "bg-[#C5A059] text-[#0A192F] font-semibold shadow-sm"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar */}
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
            className="w-full px-4 py-2.5 text-xs uppercase tracking-wider bg-red-950/60 text-red-200 hover:bg-red-900/80 rounded-sm transition"
          >
            Sair da Conta
          </button>
        </div>
      </aside>

      {/* ÁREA DE CONTEÚDO PRINCIPAL (Adaptada para toque e telas estreitas) */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}