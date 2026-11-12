import React from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getCurrentSession, hasPermission } from "@/lib/auth";
import { decryptSensitiveData } from "@/lib/crypto";
import { recordAuditLog } from "@/lib/audit";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export const dynamic = "force-dynamic";

export default async function CentralCounselingTriagePage() {
  const session = await getCurrentSession();
  if (!session || !hasPermission(session.role, "counseling:view")) {
    redirect("/central?error=acesso_negado_lgpd");
  }

  const requests = await prisma.counselingRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 25,
  });

  await recordAuditLog({
    userId: session.userId,
    action: "COUNSELING_LIST_ACCESSED_AND_DECRYPTED",
    module: "CENTRAL",
    metadata: { count: requests.length, role: session.role },
  });

  return (
    <div className="space-y-8">
      <div>
        <GaBadge variant="success">Ambiente Protegido LGPD • AES-256-GCM</GaBadge>
        <h1 className="text-2xl font-editorial font-bold text-ga-navy mt-2">
          Cuidado Pastoral — Solicitações de Oração e Aconselhamento
        </h1>
        <p className="text-sm text-ga-slate mt-1">
          Acesso restrito ao Pastor Geraldo Afonso e à Equipe Pastoral. Todo
          acesso a esta tela é registrado na trilha de auditoria.
        </p>
      </div>

      <div className="space-y-4">
        {requests.map((req) => {
          const requesterName = decryptSensitiveData(req.encryptedRequesterName);
          const contactInfo = decryptSensitiveData(req.encryptedContactInfo);
          const message = decryptSensitiveData(req.encryptedMessage);

          return (
            <GaCard
              key={req.id}
              title={`${requesterName} — ${req.subjectCategory}`}
              subtitle={`Recebido em ${new Date(req.createdAt).toLocaleString("pt-BR")} • Contato: ${contactInfo}`}
              badge={<GaBadge variant="gold">{req.status}</GaBadge>}
            >
              <p className="text-sm text-ga-navy whitespace-pre-line bg-ga-ivory p-4 border border-ga-slate-light">
                {message}
              </p>
            </GaCard>
          );
        })}
      </div>
    </div>
  );
}