import React from "react";
import { GaCard, GaBadge } from "@/components/ui/ga-primitives";

export default function EditorInteligentePage() {
  return (
    <div className="space-y-8">
      <div>
        <GaBadge variant="gold">Produção de Conteúdo e Revisão</GaBadge>
        <h1 className="text-2xl font-editorial font-bold text-ga-navy mt-2">
          Editor Inteligente assistido por IA
        </h1>
        <p className="text-sm text-ga-slate mt-1">
          Nenhuma inteligência artificial substitui a revelação do Espírito Santo.
          Esta ferramenta auxilia na correção e adaptação de textos, preservando a voz e a doutrina.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Área de Edição */}
        <div className="lg:col-span-8 space-y-6">
          <GaCard title="Área de Rascunho e Transcrição">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título da Mensagem ou Artigo..."
                className="w-full px-4 py-3 border border-ga-slate-light text-ga-navy font-editorial font-bold text-lg focus:outline-none focus:border-ga-gold"
              />
              <textarea
                rows={12}
                placeholder="Cole aqui a transcrição, esboço ou texto original do Pr. Geraldo Afonso..."
                className="w-full px-4 py-3 border border-ga-slate-light text-ga-slate text-sm leading-relaxed focus:outline-none focus:border-ga-gold resize-y"
              />
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-ga-slate">
                  O texto original será usado como base (Ground Truth) para a IA.
                </span>
                <button className="px-6 py-2.5 bg-ga-navy text-white text-xs uppercase tracking-wider font-semibold hover:bg-ga-navy-light">
                  Salvar Rascunho
                </button>
              </div>
            </div>
          </GaCard>
        </div>

        {/* Painel de Assistência IA e Aprovação */}
        <div className="lg:col-span-4 space-y-6">
          <GaCard
            title="Assistente de Publicação (IA)"
            badge={<GaBadge variant="navy">Ações</GaBadge>}
          >
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 border border-ga-slate-light hover:border-ga-gold hover:bg-ga-ivory transition-colors">
                <span className="block text-sm font-semibold text-ga-navy">Correção Gramatical</span>
                <span className="block text-xs text-ga-slate mt-1">Revisa pontuação e ortografia sem alterar o sentido.</span>
              </button>
              <button className="w-full text-left px-4 py-3 border border-ga-slate-light hover:border-ga-gold hover:bg-ga-ivory transition-colors">
                <span className="block text-sm font-semibold text-ga-navy">Adaptar para Redes Sociais</span>
                <span className="block text-xs text-ga-slate mt-1">Gera legenda, hashtags e sugestão de título.</span>
              </button>
              <button className="w-full text-left px-4 py-3 border border-ga-slate-light hover:border-ga-gold hover:bg-ga-ivory transition-colors">
                <span className="block text-sm font-semibold text-ga-navy">Gerar Resumo (Portal)</span>
                <span className="block text-xs text-ga-slate mt-1">Extrai o tema central para a biblioteca de mensagens.</span>
              </button>
            </div>
          </GaCard>

          <GaCard title="Fluxo de Aprovação Humana">
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-ga-ivory-warm border border-ga-slate-light">
                <input type="checkbox" id="check-teo" className="mt-1" />
                <label htmlFor="check-teo" className="text-xs text-ga-slate leading-relaxed">
                  Confirmo que o sentido teológico, as referências bíblicas e a voz do pastor foram preservados no texto final.
                </label>
              </div>
              <button disabled className="w-full px-6 py-3 bg-ga-gold text-ga-navy-dark text-xs uppercase tracking-wider font-semibold opacity-50 cursor-not-allowed">
                Enviar para Aprovação Pastoral
              </button>
              <p className="text-[10px] text-center text-ga-slate uppercase tracking-wider">
                Requer revisão humana para liberar publicação
              </p>
            </div>
          </GaCard>
        </div>
      </div>
    </div>
  );
}