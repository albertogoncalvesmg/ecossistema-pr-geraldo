import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function CalendarioPage() {
  return (
    <div className="space-y-8">
      <GaBadge variant="gold">Planejamento Estratégico</GaBadge>
      <h1 className="text-2xl font-editorial font-bold text-ga-navy">Calendário Editorial</h1>
      <GaCard title="Visão Mensal"><p className="text-sm text-ga-slate py-10 text-center">Calendário em construção na Fase 3.</p></GaCard>
    </div>
  );
}