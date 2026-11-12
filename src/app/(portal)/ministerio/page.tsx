import React from "react";
import Link from "next/link";
import {
  PASTOR_BIOGRAPHY_SUMMARY,
  OFFICIAL_PHOTOS,
} from "@/lib/real-biography-data";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function MinisterioPage() {
  const pillars = [
    {
      title: "Pregação e Ministração da Palavra",
      tag: "Altar & Cruzadas",
      description:
        "Mais de meio século proclamando o Evangelho no Brasil e no exterior, com ênfase na fé prática, no arrependimento, na quebra de cadeias espirituais e na manifestação do poder de Deus.",
    },
    {
      title: "Ensino Bíblico e Formação de Líderes",
      tag: "Seminários & Doutrina",
      description:
        "Atuação como professor e conferencista em seminários e escolas bíblicas, preparando pastores e obreiros sob os princípios de hierarquia, submissão e fidelidade às Escrituras.",
    },
    {
      title: "Aconselhamento Pastoral e Intercessão",
      tag: "Cuidado de Almas",
      description:
        "Dedicação diária à oração e ao aconselhamento de famílias, casais e líderes que atravessam vales emocionais e espirituais, oferecendo escuta madura e fundamentada na graça.",
    },
    {
      title: "Presença Digital e TV Vida Abundante",
      tag: "Comunicação & Alcance",
      description:
        "Transmissões constantes ao vivo pelo YouTube, Facebook e Instagram, além de reflexões escritas diretamente pelo pastor para edificar vidas diariamente.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      <div className="border-b border-ga-slate-light pb-8">
        <GaBadge variant="gold">Atuação Ministerial</GaBadge>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy mt-2">
          Ministério, Ensino Bíblico e Igreja Local
        </h1>
        <p className="text-base text-ga-slate mt-2 max-w-3xl">
          Conheça as frentes de trabalho ministerial conduzidas pelo{" "}
          {PASTOR_BIOGRAPHY_SUMMARY.fullName} na{" "}
          <strong>{PASTOR_BIOGRAPHY_SUMMARY.churchName}</strong> e nos canais
          digitais oficiais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pillars.map((pillar) => (
          <GaCard
            key={pillar.title}
            title={pillar.title}
            badge={<GaBadge variant="navy">{pillar.tag}</GaBadge>}
          >
            <p className="text-sm text-ga-slate leading-relaxed">
              {pillar.description}
            </p>
          </GaCard>
        ))}
      </div>

      {/* Destaque Igreja Pentecostal Unida do Brasil */}
      <div className="bg-white border border-ga-slate-light p-8 shadow-editorial grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6">
          <img
            src={OFFICIAL_PHOTOS.churchFacade}
            alt="Igreja Pentecostal Unida do Brasil"
            className="w-full h-72 object-cover border border-ga-gold"
          />
        </div>
        <div className="lg:col-span-6 space-y-4">
          <GaBadge variant="gold">Comunhão e Culto Presencial</GaBadge>
          <h2 className="text-2xl font-editorial font-bold text-ga-navy">
            {PASTOR_BIOGRAPHY_SUMMARY.churchName}
          </h2>
          <p className="text-sm text-ga-slate leading-relaxed">
            A igreja local é o centro de adoração, ensino bíblico, jejum,
            intercessão e comunhão das famílias. Além dos cultos presenciais, as
            ministrações são transmitidas pela{" "}
            <strong>{PASTOR_BIOGRAPHY_SUMMARY.youtubeChannel}</strong>.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/contato"
              className="px-5 py-2.5 bg-ga-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-ga-navy-light"
            >
              Convidar para Ministração / Eventos
            </Link>
            <a
              href={PASTOR_BIOGRAPHY_SUMMARY.youtubeSampleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-ga-navy text-ga-navy text-xs uppercase tracking-wider font-semibold hover:bg-ga-ivory-warm"
            >
              Assistir Culto no YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}