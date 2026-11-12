import React from "react";
import { prisma } from "@/lib/db";
import { getCurrentSession, hasPermission } from "@/lib/auth";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default async function CentralDashboardPage() {
  const session = await getCurrentSession();

  const [
    pendingApprovalsCount,
    totalBooksCount,
    archiveDocumentsCount,
    counselingPendingCount,
    recentAuditLogs,
  ] = await Promise.all([
    prisma.ministerialContent.count({
      where: { status: "PENDING_APPROVAL" },
    }),
    prisma.book.count({ where: { isActive: true } }),
    prisma.archiveDocument.count(),
    hasPermission(session!.role, "counseling:view")
      ? prisma.counselingRequest.count({ where: { status: "RECEIVED" } })
      : Promise.resolve(0),
    prisma.auditLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, role: true } } },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-editorial font-bold text-ga-navy">
          Painel de Controle — Ecossistema Pastor Geraldo Afonso
        </h1>
        <p className="text-sm text-ga-slate mt-1">
          Visão consolidada dos módulos integrados, aprovações pendentes e governança de dados.
        </p>
      </div>

      {/* Indicadores Operacionais Reais do Banco */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GaCard
          title="Aguardando Aprovação"
          subtitle="Conteúdos para revisão pastoral"
          badge={<GaBadge variant="warning">Fluxo Humano</GaBadge>}
        >
          <p className="text-3xl font-editorial font-bold text-ga-navy">
            {pendingApprovalsCount}
          </p>
          <p className="text-xs text-ga-slate mt-2">
            Nenhuma publicação é enviada sem aprovação explícita.
          </p>
        </GaCard>

        <GaCard
          title="Biblioteca de Livros"
          subtitle="Obras ativas no Portal Oficial"
          badge={<GaBadge variant="navy">Módulo 1</GaBadge>}
        >
          <p className="text-3xl font-editorial font-bold text-ga-navy">
            {totalBooksCount}
          </p>
          <p className="text-xs text-ga-slate mt-2">
            Catálogo sincronizado com o Portal Público.
          </p>
        </GaCard>

        <GaCard
          title="Arquivo Vivo GA"
          subtitle="Documentos históricos catalogados"
          badge={<GaBadge variant="gold">Módulo 4</GaBadge>}
        >
          <p className="text-3xl font-editorial font-bold text-ga-navy">
            {archiveDocumentsCount}
          </p>
          <p className="text-xs text-ga-slate mt-2">
            Base documental para pesquisa com citação verificada.
          </p>
        </GaCard>

        {hasPermission(session!.role, "counseling:view") ? (
          <GaCard
            title="Cuidado Pastoral"
            subtitle="Solicitações criptografadas (LGPD)"
            badge={<GaBadge variant="success">Sigilo Ativo</GaBadge>}
          >
            <p className="text-3xl font-editorial font-bold text-ga-navy">
              {counselingPendingCount}
            </p>
            <p className="text-xs text-ga-slate mt-2">
              Visível exclusivamente para Pastor e Equipe Pastoral.
            </p>
          </GaCard>
        ) : (
          <GaCard
            title="Cuidado Pastoral"
            subtitle="Isolamento de Segurança LGPD"
            badge={<GaBadge variant="navy">Restrito</GaBadge>}
          >
            <p className="text-sm text-ga-slate mt-1">
              O perfil <strong>{session!.role}</strong> não possui acesso aos dados sensíveis de aconselhamento pastoral, em conformidade com o princípio do menor privilégio.
            </p>
          </GaCard>
        )}
      </div>

      {/* Registro Recente de Auditoria */}
      <GaCard
        title="Trilha de Auditoria e Segurança Recente"
        subtitle="Registro de operações executadas no ecossistema"
      >
        <div className="divide-y divide-ga-slate-light">
          {recentAuditLogs.map((log) => (
            <div
              key={log.id}
              className="py-3 flex items-center justify-between text-sm"
            >
              <div>
                <span className="font-semibold text-ga-navy">{log.action}</span>
                <span className="text-ga-slate ml-2">
                  por {log.user?.name || "Sistema"} ({log.user?.role || "N/A"})
                </span>
              </div>
              <div className="flex items-center gap-3">
                <GaBadge variant="navy">{log.module}</GaBadge>
                <span className="text-xs text-ga-slate">
                  {new Date(log.createdAt).toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GaCard>
    </div>
  );
}