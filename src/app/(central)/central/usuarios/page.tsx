import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function UsuariosPage() {
  return (
    <div className="space-y-8">
      <GaBadge variant="navy">Governança e RBAC</GaBadge>
      <h1 className="text-2xl font-editorial font-bold text-ga-navy">Usuários e Permissões</h1>
      <GaCard title="Gestão de Acessos"><p className="text-sm text-ga-slate py-10 text-center">Gestão de perfis em construção.</p></GaCard>
    </div>
  );
}