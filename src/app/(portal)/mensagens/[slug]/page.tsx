import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export const dynamic = "force-dynamic";

export default async function MensagemDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const content = await prisma.ministerialContent.findUnique({
    where: { slug },
  });

  if (!content) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8">
      <div className="space-y-3 border-b border-ga-slate-light pb-6">
        <div className="flex items-center gap-2">
          <GaBadge variant="gold">{content.type}</GaBadge>
          <span className="text-xs text-ga-slate font-medium">
            {content.category} • Ref: {content.biblicalReference || "Palavra Pastoral"}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy">
          {content.title}
        </h1>

        {content.subtitle && (
          <p className="text-base font-medium text-ga-gold-dark">
            {content.subtitle}
          </p>
        )}
      </div>

      {content.videoUrl && (
        <div className="aspect-video w-full rounded-sm overflow-hidden bg-black shadow-editorial">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/PToM1532YMo"
            title={content.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      <GaCard title="Conteúdo da Mensagem e Estudo Bíblico">
        <div className="prose max-w-none text-ga-slate leading-relaxed whitespace-pre-line text-base">
          {content.bodyText}
        </div>
      </GaCard>

      <div className="pt-4">
        <Link
          href="/mensagens"
          className="text-xs uppercase tracking-wider font-semibold text-ga-navy hover:underline"
        >
          &larr; Voltar para todas as mensagens e estudos
        </Link>
      </div>
    </div>
  );
}