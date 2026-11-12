import React from "react";
import { prisma } from "@/lib/db";
import { GaBadge } from "@/components/ui/ga-primitives";

export const dynamic = "force-dynamic";

export default async function BibliotecaLivrosPage() {
  const books = await prisma.book.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <div className="border-b border-ga-slate-light pb-8">
        <GaBadge variant="gold">Obras Literárias</GaBadge>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy mt-2">
          Biblioteca Oficial — Pastor Geraldo Afonso
        </h1>
        <p className="text-base text-ga-slate mt-2 max-w-3xl">
          Livros escritos a partir de décadas de estudo das Escrituras,
          testemunhos reais de superação e formação de lideranças cristãs.
        </p>
      </div>

      <div className="space-y-12">
        {books.map((book) => (
          <article
            key={book.id}
            className="bg-white border border-ga-slate-light shadow-editorial p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-xs aspect-[3/4] bg-ga-navy-dark border-2 border-ga-gold overflow-hidden shadow-lg">
                <img
                  src={book.coverUrl}
                  alt={`Capa do livro ${book.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <GaBadge variant="navy">{book.format}</GaBadge>
                  <span className="text-xs text-ga-slate font-medium">
                    Autor: {book.author}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-ga-navy">
                  {book.title}
                </h2>

                {book.subtitle && (
                  <p className="text-sm font-medium text-ga-gold-dark">
                    {book.subtitle}
                  </p>
                )}

                <p className="text-sm text-ga-slate leading-relaxed pt-2">
                  <strong>Descrição:</strong> {book.description}
                </p>

                <p className="text-sm text-ga-slate leading-relaxed">
                  <strong>Sinopse:</strong> {book.synopsis}
                </p>

                {book.authorizedExcerpt && (
                  <div className="mt-4 p-4 bg-ga-ivory border-l-4 border-ga-gold">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-ga-navy block mb-1">
                      Prévia / Trecho Autorizado da Obra
                    </span>
                    <p className="text-sm italic text-ga-slate leading-relaxed">
                      {book.authorizedExcerpt}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-ga-slate-light flex flex-wrap items-center justify-between gap-4">
                <div>
                  {book.priceCents ? (
                    <span className="text-lg font-bold text-ga-navy">
                      R$ {(book.priceCents / 100).toFixed(2).replace(".", ",")}
                    </span>
                  ) : (
                    <span className="text-xs uppercase tracking-wider text-ga-slate">
                      Consulte disponibilidade impressa e digital
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {book.checkoutUrl ? (
                    <a
                      href={book.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-ga-navy hover:bg-ga-navy-light text-white text-xs font-semibold uppercase tracking-wider border-b-2 border-ga-gold"
                    >
                      Adquirir Livro Oficial
                    </a>
                  ) : (
                    <a
                      href="/contato?assunto=Aquisicao_de_Livro"
                      className="px-6 py-2.5 bg-ga-navy hover:bg-ga-navy-light text-white text-xs font-semibold uppercase tracking-wider border-b-2 border-ga-gold"
                    >
                      Solicitar Exemplar com a Equipe
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}