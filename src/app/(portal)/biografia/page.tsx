import React from "react";
import {
  PASTOR_BIOGRAPHY_SUMMARY,
  HOMOLOGATED_TIMELINE,
  OFFICIAL_PHOTOS,
} from "@/lib/real-biography-data";
import { GaBadge, GaCard } from "@/components/ui/ga-primitives";

export default function BiografiaPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      {/* Cabeçalho Biográfico */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-ga-slate-light pb-12">
        <div className="lg:col-span-7 space-y-4">
          <GaBadge variant="gold">Biografia Oficial Homologada</GaBadge>
          <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy">
            {PASTOR_BIOGRAPHY_SUMMARY.fullName}
          </h1>
          <p className="text-base text-ga-slate leading-relaxed">
            {PASTOR_BIOGRAPHY_SUMMARY.shortBio}
          </p>
          <p className="text-sm text-ga-slate leading-relaxed">
            Casado, pai e conselheiro espiritual de numerosas famílias e
            obreiros, sua trajetória ministerial é marcada pela fidelidade às
            Escrituras, pela vivência prática da fé sobrenatural e por uma
            autoridade espiritual forjada tanto no púlpito quanto na superação
            de grandes desertos pessoais.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-3 border border-ga-gold shadow-editorial">
            <img
              src={OFFICIAL_PHOTOS.pulpitPreaching}
              alt="Pastor Geraldo Afonso pregando no púlpito"
              className="w-full h-72 object-cover"
            />
            <p className="text-xs text-ga-slate mt-2 text-center">
              Pr. Geraldo Afonso ministrando a Palavra de Deus (Deuteronômio 7:25).
            </p>
          </div>
        </div>
      </div>

      {/* Linha do Tempo Ministerial Real */}
      <section className="space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-ga-gold-dark font-semibold">
            Marcos Documentados nas Obras do Autor
          </span>
          <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-ga-navy mt-1">
            Linha do Tempo Ministerial e Pessoal
          </h2>
        </div>

        <div className="relative border-l-2 border-ga-gold ml-4 pl-8 space-y-10">
          {HOMOLOGATED_TIMELINE.map((milestone, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-ga-navy border-2 border-ga-gold" />
              <div className="bg-white border border-ga-slate-light p-6 shadow-editorial">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-ga-gold-dark">
                    {milestone.year} — {milestone.location}
                  </span>
                  <span className="text-[11px] text-ga-slate">
                    Fonte: {milestone.sourceReference}
                  </span>
                </div>
                <h3 className="text-xl font-editorial font-bold text-ga-navy">
                  {milestone.title}
                </h3>
                <p className="text-sm text-ga-slate mt-2 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Galeria Fotográfica Institucional */}
      <section className="space-y-6">
        <h2 className="text-2xl font-editorial font-bold text-ga-navy">
          Galeria Ministerial e Institucional
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GaCard
            title="Ministração no Altar"
            subtitle="Clamor e ensino da Palavra"
          >
            <img
              src={OFFICIAL_PHOTOS.altarMinistry}
              alt="Ministração no altar com a igreja"
              className="w-full h-56 object-cover border border-ga-slate-light"
            />
          </GaCard>

          <GaCard
            title="Igreja Pentecostal Unida do Brasil"
            subtitle="Templo e sede de ministração"
          >
            <img
              src={OFFICIAL_PHOTOS.churchFacade}
              alt="Fachada da Igreja Pentecostal Unida do Brasil"
              className="w-full h-56 object-cover border border-ga-slate-light"
            />
          </GaCard>

          <GaCard
            title="Família e Aliança"
            subtitle="Pr. Geraldo Afonso e esposa"
          >
            <img
              src={OFFICIAL_PHOTOS.coupleBackCover}
              alt="Pastor Geraldo Afonso ao lado de sua esposa"
              className="w-full h-56 object-cover object-left border border-ga-slate-light"
            />
          </GaCard>
        </div>
      </section>
    </div>
  );
}