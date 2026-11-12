import { prisma } from "./db";
import { Prisma } from "@prisma/client";

interface RecordAuditParams {
  userId?: string;
  action: string;
  module: "PORTAL" | "CENTRAL" | "ESTUDIO" | "ARQUIVO_VIVO" | "AUTH";
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}

export async function recordAuditLog(params: RecordAuditParams): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId ?? null,
        action: params.action,
        module: params.module,
        targetId: params.targetId ?? null,
        metadata: (params.metadata as Prisma.InputJsonValue) ?? Prisma.JsonNull,
        ipAddress: params.ipAddress ?? null,
      },
    });
  } catch (error) {
    console.error("Falha ao gravar registro de auditoria:", error);
  }
}