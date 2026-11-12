import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function RedesSociaisPage() {
  return (
    <div className="space-y-8">
      <div>
        <GaBadge variant="gold">Distribuição de Conteúdo</GaBadge>
        <h1 className="text-2xl font-editorial font-bold text-ga-navy mt-2">
          Central de Redes Sociais
        </h1>
        <p className="text-sm text-ga-slate mt-1">
          Gestão unificada de publicações no Instagram, Facebook, YouTube e TikTok.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GaCard title="Status das Plataformas" subtitle="Modo de Entrega Atual">
          <ul className="space-y-3 mt-2">
            <li className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ga-navy">Instagram & FB</span>
              <GaBadge variant="warning">Exportação Assistida</GaBadge>
            </li>
            <li className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ga-navy">YouTube</span>
              <GaBadge variant="success">API Conectada</GaBadge>
            </li>
            <li className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ga-navy">TikTok</span>
              <GaBadge variant="warning">Exportação Assistida</GaBadge>
            </li>
          </ul>
        </GaCard>

        <div className="md:col-span-2">
          <GaCard title="Próximas Publicações Aprovadas" subtitle="Aguardando envio ou agendamento">
            <div className="flex items-center justify-center h-32 bg-ga-ivory border border-dashed border-ga-slate-light">
              <p className="text-sm text-ga-slate">Nenhuma publicação aprovada na fila de espera.</p>
            </div>
          </GaCard>
        </div>
      </div>
    </div>
  );
}