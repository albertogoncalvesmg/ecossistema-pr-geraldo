import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { encryptSensitiveData } from "@/lib/crypto";
import { recordAuditLog } from "@/lib/audit";

const counselingSchema = z.object({
  requesterName: z.string().min(2, "Informe seu nome."),
  contactInfo: z.string().min(8, "Informe um telefone/WhatsApp ou e-mail válido."),
  subjectCategory: z.enum([
    "Pedido de Oração",
    "Aconselhamento Familiar / Casamento",
    "Superação Emocional / Depressão",
    "Direção Espiritual",
    "Outros",
  ]),
  message: z.string().min(10, "Escreva brevemente sua solicitação."),
  lgpdConsent: z.literal(true, {
    errorMap: () => ({
      message: "É obrigatório aceitar o termo de sigilo e tratamento de dados (LGPD).",
    }),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = counselingSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Dados inválidos." },
        { status: 400 }
      );
    }

    const { requesterName, contactInfo, subjectCategory, message } = parsed.data;

    // Política de retenção de 12 meses conforme diretrizes de privacidade
    const retentionExpiresAt = new Date();
    retentionExpiresAt.setFullYear(retentionExpiresAt.getFullYear() + 1);

    const record = await prisma.counselingRequest.create({
      data: {
        subjectCategory,
        encryptedRequesterName: encryptSensitiveData(requesterName),
        encryptedContactInfo: encryptSensitiveData(contactInfo),
        encryptedMessage: encryptSensitiveData(message),
        lgpdConsentAccepted: true,
        retentionExpiresAt,
      },
    });

    await recordAuditLog({
      action: "COUNSELING_REQUEST_CREATED_ENCRYPTED",
      module: "PORTAL",
      targetId: record.id,
      metadata: { subjectCategory },
    });

    return NextResponse.json({
      success: true,
      message:
        "Sua solicitação foi criptografada e encaminhada com sigilo exclusivo para a Equipe Pastoral.",
    });
  } catch (error) {
    console.error("Erro ao registrar solicitação de aconselhamento:", error);
    return NextResponse.json(
      { error: "Erro interno ao registrar sua solicitação." },
      { status: 500 }
    );
  }
}