import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function ArquivoVivoPage() {
  return (
    <div className="space-y-8">
      <GaBadge variant="gold">Módulo 4</GaBadge>
      <h1 className="text-2xl font-editorial font-bold text-ga-navy">Arquivo Vivo GA</h1>
      <GaCard title="Acervo Histórico e Busca RAG"><p className="text-sm text-ga-slate py-10 text-center">Biblioteca inteligente agendada para a Fase 5.</p></GaCard>
    </div>
  );
}