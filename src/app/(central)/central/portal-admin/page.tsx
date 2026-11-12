import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function PortalAdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <GaBadge variant="gold">Gestão do Portal Público</GaBadge>
        <h1 className="text-2xl font-editorial font-bold text-ga-navy mt-2">
          Painel Administrativo do Portal GA
        </h1>
        <p className="text-sm text-ga-slate mt-1">
          Gerencie livros, eventos e conteúdos exibidos no Portal Oficial.
        </p>
      </div>

      <GaCard title="Livros e Obras Literárias" subtitle="Controle de vitrine pública">
        <p className="text-sm text-ga-slate py-6">
          Os 4 livros oficiais do Pastor Geraldo Afonso estão ativos e sincronizados com a Loja Online.
        </p>
      </GaCard>
    </div>
  );
}