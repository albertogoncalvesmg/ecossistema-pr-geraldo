import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export const dynamic = "force-dynamic";

export default async function MensagensEstudosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || "";
  const categoryFilter = params.categoria?.trim() || "";

  const contents = await prisma.ministerialContent.findMany({
    where: {
      status: "PUBLISHED",
      ...(categoryFilter ? { category: categoryFilter } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" } },
              { bodyText: { contains: query, mode: "insensitive" } },
              { biblicalReference: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-ga-slate-light pb-8">
        <GaBadge variant="gold">Palavra Falada e Escrita</GaBadge>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy mt-2">
          Mensagens, Pregações e Estudos Bíblicos
        </h1>
        <p className="text-base text-ga-slate mt-2">
          Pesquise por tema, título ou referência bíblica nas ministrações da TV
          Vida Abundante e nos estudos escritos pelo Pastor Geraldo Afonso.
        </p>

        {/* Barra de Busca Funcional */}
        <form method="GET" action="/mensagens" className="mt-6 flex flex-wrap gap-3">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Buscar por título, assunto ou texto bíblico (ex: 2 Crônicas 20, Fé, Código Sagrado)..."
            className="flex-1 min-w-[260px] px-4 py-2.5 bg-white border border-ga-slate-light text-sm text-ga-navy focus:outline-none focus:border-ga-gold"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-ga-navy text-white text-xs font-semibold uppercase tracking-wider hover:bg-ga-navy-light"
          >
            Pesquisar
          </button>
          {(query || categoryFilter) && (
            <Link
              href="/mensagens"
              className="px-4 py-2.5 border border-ga-slate-light text-xs uppercase tracking-wider text-ga-slate hover:bg-white"
            >
              Limpar Filtro
            </Link>
          )}
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {contents.map((item) => (
          <GaCard
            key={item.id}
            title={item.title}
            subtitle={`${item.category} • Ref: ${item.biblicalReference || "Geral"}`}
            badge={<GaBadge variant="gold">{item.type}</GaBadge>}
          >
            <p className="text-sm text-ga-slate leading-relaxed mb-4">
              {item.summary}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-ga-ivory-warm">
              <Link
                href={`/mensagens/${item.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-ga-navy hover:text-ga-gold-dark"
              >
                Abrir Estudo Completo &rarr;
              </Link>
              {item.videoUrl && (
                <a
                  href={item.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-ga-gold-dark hover:underline"
                >
                  Assistir na TV Vida Abundante
                </a>
              )}
            </div>
          </GaCard>
        ))}
      </div>
    </div>
  );
}