import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";
import { PASTOR_BIOGRAPHY_SUMMARY } from "@/lib/real-biography-data";

export default function ContatoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-ga-slate-light pb-6">
        <GaBadge variant="gold">Canais Oficiais</GaBadge>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy mt-2">
          Contato, Agenda e Convites
        </h1>
        <p className="text-sm text-ga-slate mt-2">
          Entre em contato com a secretaria do Ministério para envio de convites de
          ministração, congressos e eventos com o Pastor Geraldo Afonso.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GaCard title="Informações Institucionais" subtitle="Ministério Vida Abundante">
          <ul className="space-y-3 text-sm text-ga-slate">
            <li>
              <strong>Liderança:</strong> {PASTOR_BIOGRAPHY_SUMMARY.fullName}
            </li>
            <li>
              <strong>Denominação:</strong> {PASTOR_BIOGRAPHY_SUMMARY.churchName}
            </li>
            <li>
              <strong>Transmissões:</strong> Canal oficial no YouTube ({PASTOR_BIOGRAPHY_SUMMARY.youtubeChannel})
            </li>
          </ul>
        </GaCard>

        <GaCard title="Atendimento e Oração" subtitle="Sigilo e Cuidado Pastoral">
          <p className="text-sm text-ga-slate mb-4">
            Para solicitações de aconselhamento e oração, utilize nossa área dedicada com proteção LGPD.
          </p>
          <a
            href="/aconselhamento"
            className="inline-block px-5 py-2.5 bg-ga-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-ga-navy-light"
          >
            Acessar Aconselhamento &rarr;
          </a>
        </GaCard>
      </div>
    </div>
  );
}