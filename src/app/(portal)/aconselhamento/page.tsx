"use client";

import React, { useState } from "react";
import { GaBadge, GaCard } from "@/components/ui/ga-primitives";

export default function AconselhamentoPastoralPage() {
  const [requesterName, setRequesterName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [subjectCategory, setSubjectCategory] = useState("Pedido de Oração");
  const [message, setMessage] = useState("");
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{
    type: "ok" | "err";
    text: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatusMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/counseling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName,
          contactInfo,
          subjectCategory,
          message,
          lgpdConsent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatusMsg({ type: "err", text: data.error || "Falha no envio." });
      } else {
        setStatusMsg({ type: "ok", text: data.message });
        setRequesterName("");
        setContactInfo("");
        setMessage("");
        setLgpdConsent(false);
      }
    } catch {
      setStatusMsg({
        type: "err",
        text: "Erro de comunicação ao enviar solicitação.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
      <div className="border-b border-ga-slate-light pb-6">
        <GaBadge variant="gold">Cuidado Pastoral e Intercessão</GaBadge>
        <h1 className="text-3xl sm:text-4xl font-editorial font-bold text-ga-navy mt-2">
          Aconselhamento Pastoral e Pedidos de Oração
        </h1>
        <p className="text-sm text-ga-slate mt-2 leading-relaxed">
          &ldquo;Foi na fraqueza da depressão que o poder de Deus se
          aperfeiçoou, preparando-nos para realmente compreendermos o coração de
          Deus e o sofrimento do próximo.&rdquo; — Pr. Geraldo Afonso
        </p>
      </div>

      {/* Aviso de Transparência e Proteção LGPD */}
      <div className="bg-ga-navy text-white p-6 border-l-4 border-ga-gold space-y-2">
        <h2 className="text-base font-editorial font-bold text-ga-gold-light">
          Compromisso de Sigilo Pastoral e Transparência
        </h2>
        <p className="text-xs text-ga-ivory/90 leading-relaxed">
          1. <strong>Proteção Especial:</strong> Todos os dados enviados neste
          formulário são criptografados imediatamente (AES-256-GCM) e jamais são
          exibidos publicamente. Apenas o Pastor Geraldo Afonso e a Equipe
          Pastoral autorizada possuem permissão de leitura.
        </p>
        <p className="text-xs text-ga-ivory/90 leading-relaxed">
          2. <strong>Tempo de Resposta:</strong> Cada mensagem é lida e
          apresentada em oração com atenção. Por se tratar de cuidado pastoral
          humano e criterioso, <strong>não prometemos atendimento imediato</strong>.
        </p>
      </div>

      <GaCard title="Formulário Confidencial de Oração e Aconselhamento">
        {statusMsg && (
          <div
            className={`mb-6 p-4 text-sm border ${
              statusMsg.type === "ok"
                ? "bg-emerald-950/10 border-emerald-700 text-emerald-950"
                : "bg-red-950/10 border-red-700 text-red-950"
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ga-navy mb-1">
                Seu Nome
              </label>
              <input
                type="text"
                required
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-ga-slate-light text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-ga-navy mb-1">
                WhatsApp / Telefone ou E-mail de Retorno
              </label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full px-3.5 py-2.5 border border-ga-slate-light text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ga-navy mb-1">
              Assunto ou Categoria
            </label>
            <select
              value={subjectCategory}
              onChange={(e) => setSubjectCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-ga-slate-light text-sm bg-white"
            >
              <option value="Pedido de Oração">Pedido de Oração</option>
              <option value="Aconselhamento Familiar / Casamento">
                Aconselhamento Familiar / Casamento
              </option>
              <option value="Superação Emocional / Depressão">
                Superação Emocional / Depressão
              </option>
              <option value="Direção Espiritual">Direção Espiritual</option>
              <option value="Outros">Outros</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-ga-navy mb-1">
              Sua Mensagem ou Motivo de Oração
            </label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-ga-slate-light text-sm"
              placeholder="Escreva com tranquilidade. Sua mensagem está protegida por sigilo pastoral."
            />
          </div>

          <div className="flex items-start gap-3 p-3 bg-ga-ivory border border-ga-slate-light">
            <input
              id="lgpd"
              type="checkbox"
              checked={lgpdConsent}
              onChange={(e) => setLgpdConsent(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="lgpd" className="text-xs text-ga-slate leading-relaxed">
              Autorizo o envio confidencial destas informações exclusivamente
              para fins de intercessão e cuidado pastoral pela equipe autorizada
              do Pastor Geraldo Afonso, nos termos da LGPD.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 bg-ga-navy hover:bg-ga-navy-light text-white text-xs font-semibold uppercase tracking-wider border-b-2 border-ga-gold disabled:opacity-50"
          >
            {submitting
              ? "Criptografando e Enviando..."
              : "Enviar para a Equipe Pastoral"}
          </button>
        </form>
      </GaCard>
    </div>
  );
}