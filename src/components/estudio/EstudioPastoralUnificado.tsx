"use client";

import React, { useState, useEffect } from "react";

export type PastoralItemCategory =
  | "Artigo / Reflexão"
  | "Esboço de Pregação"
  | "Texto Pronto (Redes / WhatsApp)"
  | "Anotação Pastoral";

export interface SavedPastoralText {
  id: string;
  category: PastoralItemCategory;
  title: string;
  bibleVerse: string;
  content: string;
  dateLabel: string;
  publishedToBlog?: boolean;
}

export const INITIAL_PASTORAL_TEXTS: SavedPastoralText[] = [
  {
    id: "fe-ultrapassa-limites",
    category: "Esboço de Pregação",
    title: "O QUE A FÉ PODE FAZER, ULTRAPASSA LIMITES",
    bibleVerse: "2 Crônicas 20:1-15",
    dateLabel: "28 Set 2026",
    publishedToBlog: true,
    content: `A Paz do Senhor, amados irmãos!\n\nA lucidez da nossa mente e o mistério da fé estarão sempre em combate. Quando três exércitos vieram contra Josafá, a lógica humana dizia que não havia saída, mas ele pôs os olhos no Senhor em jejum e oração.\n\nNão pare no gigante do "E se...". A peleja não é vossa, mas é de Deus! Persevere no processo até ver a glória do Senhor na sua casa.`,
  },
  {
    id: "oracao-de-jabez",
    category: "Texto Pronto (Redes / WhatsApp)",
    title: "PALAVRA DE FÉ: A ORAÇÃO DE JABEZ (1 CRÔNICAS 4:10)",
    bibleVerse: "1 Crônicas 4:9-10",
    dateLabel: "15 Set 2026",
    publishedToBlog: true,
    content: `A Paz do Senhor, amados irmãos e amigos! 🙏\n\nJabez carregava um nome que significava "aquele que causa dor", mas ele decidiu que o seu passado não determinaria o seu futuro! Ele clamou em 1 Crônicas 4:10:\n\n"Oh! Tomara que me abençoes muitíssimo e me alargues as fronteiras, que seja comigo a Tua mão e me preserves do mal!" E a Bíblia diz: E Deus lhe concedeu o que lhe tinha pedido!\n\nCreia: o seu rótulo mudou hoje pelo poder da oração e do Código Sagrado: Crer e Obedecer!`,
  },
  {
    id: "segurando-as-bencaos",
    category: "Artigo / Reflexão",
    title: "SEGURANDO AS BÊNÇÃOS RECEBIDAS (SALMOS 1 E ATOS 28)",
    bibleVerse: "Salmos 1:1-3 / Atos 28:3-5",
    dateLabel: "02 Set 2026",
    publishedToBlog: true,
    content: `A Paz do Senhor!\n\nPara manter as bênçãos que Deus entrega em suas mãos, vigie três áreas fundamentais: o que e a quem você anda ouvindo, com quem você caminha e onde está a sua meditação diária.\n\nAssim como o apóstolo Paulo sacudiu a víbora no fogo na ilha de Malta (Atos 28), sacuda toda incredulidade no fogo do Espírito Santo. Você está plantado junto a ribeiros de águas e suas folhas não murcharão!`,
  },
];

interface EstudioProps {
  defaultModule?: 1 | 2;
  onPublishToLandingBlog?: (item: SavedPastoralText) => void;
  onBackToPublicSite?: () => void;
  showTopHeader?: boolean;
}

export default function EstudioPastoralUnificado({
  defaultModule = 1,
  onPublishToLandingBlog,
  onBackToPublicSite,
  showTopHeader = false,
}: EstudioProps) {
  const [activeModule, setActiveModule] = useState<1 | 2>(defaultModule);
  const [savedTexts, setSavedTexts] = useState<SavedPastoralText[]>(
    INITIAL_PASTORAL_TEXTS
  );

  // Estados do Módulo 1 (Caderno de Criação Pastoral)
  const [category, setCategory] =
    useState<PastoralItemCategory>("Artigo / Reflexão");
  const [title, setTitle] = useState("A FÉ QUE ULTRAPASSA LIMITES NO VALE");
  const [bibleVerse, setBibleVerse] = useState("2 Crônicas 20:12-15");
  const [content, setContent] = useState(
    `A Paz do Senhor, amados irmãos!\n\nMuitas vezes olhamos para o tamanho da multidão de problemas e nos esquecemos de Quem está no controle do barco. Como o rei Josafá orou em 2 Crônicas 20:12: "Não sabemos o que faremos, porém os nossos olhos estão postos em Ti!".\n\nColoque um louvor nos lábios hoje, porque a peleja não é sua, mas de Deus!`
  );
  const [pulpitMode, setPulpitMode] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  // Estados do Módulo 2 (Gatilho WhatsApp & Copiar p/ Facebook)
  const [sendMode, setSendMode] = useState<"groups" | "person">("groups");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [whatsappBoldTitle, setWhatsappBoldTitle] = useState(
    "PALAVRA DO PASTOR GERALDO AFONSO"
  );
  const [whatsappBody, setWhatsappBody] = useState(
    INITIAL_PASTORAL_TEXTS[1].content
  );
  const [includeTvLink, setIncludeTvLink] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ga_estudio_saved_texts_v1");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedTexts(parsed);
        }
      }
    } catch {
      // fallback seguro
    }
  }, []);

  function persistTexts(nextList: SavedPastoralText[]) {
    setSavedTexts(nextList);
    try {
      localStorage.setItem(
        "ga_estudio_saved_texts_v1",
        JSON.stringify(nextList)
      );
    } catch {
      // ignora erro de quota local
    }
  }

  function showNotification(msg: string) {
    setFeedbackBanner(msg);
    setTimeout(() => setFeedbackBanner(null), 4500);
  }

  // Reconhecimento de Voz Nativo (Web Speech API)
  function handleVoiceDictation(target: "editor" | "whatsapp") {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: unknown; webkitSpeechRecognition?: unknown })
        .SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: unknown })
        .webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Seu navegador atual não suporta ditado por voz direto. Recomendamos usar o Google Chrome ou Microsoft Edge."
      );
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognition = new (SpeechRecognition as any)();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecordingVoice(true);
    showNotification("🎙️ Microfone ativo: Pode falar, Pastor Geraldo...");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (target === "editor") {
        setContent((prev) => (prev ? `${prev} ${transcript}` : transcript));
      } else {
        setWhatsappBody((prev) =>
          prev ? `${prev} ${transcript}` : transcript
        );
      }
      setIsRecordingVoice(false);
    };

    recognition.onerror = () => {
      setIsRecordingVoice(false);
    };

    recognition.onend = () => {
      setIsRecordingVoice(false);
    };

    recognition.start();
  }

  async function saveItem(options: {
    asReadyText?: boolean;
    publishToBlog?: boolean;
    goToWhatsappTrigger?: boolean;
  }) {
    if (!title.trim() || !content.trim()) {
      alert("Por favor, preencha o título e o conteúdo do texto.");
      return;
    }

    const newItem: SavedPastoralText = {
      id: `item-${Date.now()}`,
      category: options.asReadyText
        ? "Texto Pronto (Redes / WhatsApp)"
        : category,
      title: title.trim().toUpperCase(),
      bibleVerse: bibleVerse.trim() || "Palavra Pastoral",
      content: content.trim(),
      dateLabel: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      publishedToBlog: Boolean(options.publishToBlog),
    };

    const updated = [newItem, ...savedTexts];
    persistTexts(updated);

    if (options.publishToBlog && onPublishToLandingBlog) {
      onPublishToLandingBlog(newItem);
    }

    // Sincroniza também com o banco PostgreSQL (Neon) da Central Ministerial
    try {
      await fetch("/api/studio-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
    } catch {
      // continua operando mesmo offline
    }

    if (options.goToWhatsappTrigger) {
      setWhatsappBoldTitle(newItem.title);
      setWhatsappBody(newItem.content);
      setActiveModule(2);
      showNotification(
        "✅ Texto carregado no Gatilho de WhatsApp e Facebook!"
      );
      return;
    }

    if (options.publishToBlog) {
      showNotification(
        "🌐 Publicado com sucesso no Blog da Landing Page e salvo no Banco de Dados!"
      );
    } else if (options.asReadyText) {
      showNotification(
        "✨ Salvo na lista de Textos Prontos para uso imediato!"
      );
    } else {
      showNotification("📄 Rascunho / Esboço salvo com segurança!");
    }
  }

  function buildFormattedWhatsappMessage(): string {
    const header = whatsappBoldTitle.trim()
      ? `*${whatsappBoldTitle.trim().toUpperCase()}*\n\n`
      : "";
    const personalGreeting =
      sendMode === "person" && recipientName.trim()
        ? `Olá, *${recipientName.trim()}*! `
        : "";
    const footerLink = includeTvLink
      ? `\n\n📺 *Assista também na TV Vida Abundante:*\nhttps://www.youtube.com/live/PToM1532YMo`
      : "";

    return `${header}${personalGreeting}${whatsappBody.trim()}${footerLink}`;
  }

  function handleSendWhatsappNow() {
    const fullText = buildFormattedWhatsappMessage();
    const encoded = encodeURIComponent(fullText);

    if (sendMode === "person") {
      const digits = recipientPhone.replace(/\D/g, "");
      if (digits.length < 10) {
        alert(
          "Digite o telefone com DDD do irmão(ã) para enviar individualmente, ou escolha 'Enviar p/ Grupos ou Lista'."
        );
        return;
      }
      const phoneWithCountry = digits.startsWith("55") ? digits : `55${digits}`;
      window.open(
        `https://wa.me/${phoneWithCountry}?text=${encoded}`,
        "_blank"
      );
    } else {
      window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
    }
  }

  async function handleCopyForFacebook(openFacebookAfter: boolean) {
    const fullText = buildFormattedWhatsappMessage().replace(/\*/g, "");
    try {
      await navigator.clipboard.writeText(fullText);
      showNotification(
        "📋 Texto copiado! Agora é só colar (Ctrl+V) na sua publicação do Facebook."
      );
      if (openFacebookAfter) {
        window.open("https://www.facebook.com/", "_blank");
      }
    } catch {
      alert("Não foi possível copiar automaticamente. Selecione o texto e copie.");
    }
  }

  return (
    <div className="space-y-6">
      {showTopHeader && (
        <div className="bg-white border-b border-stone-200 py-4 px-6 flex flex-wrap items-center justify-between gap-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#C5A059] flex items-center justify-center font-serif font-bold text-[#0F1E36]">
              GA
            </div>
            <div>
              <p className="font-serif font-bold text-lg text-[#0F1E36] leading-none">
                Pr. Geraldo Afonso
              </p>
              <p className="text-[11px] uppercase tracking-widest text-[#9E7B36] mt-1">
                MINISTÉRIO VIDA ABUNDANTE • IPUB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-amber-50 border border-[#C5A059]/50 text-[#9E7B36] text-xs font-semibold">
              🛡️ Ambiente Privado do Pastor Geraldo
            </span>
            {onBackToPublicSite && (
              <button
                onClick={onBackToPublicSite}
                className="px-4 py-2 rounded-full bg-[#0F1E36] text-white text-xs font-semibold hover:bg-[#1C3254] transition-colors"
              >
                🌐 Voltar ao Site Público
              </button>
            )}
          </div>
        </div>
      )}

      {/* Cabeçalho de Boas-Vindas e Seletor dos 2 Módulos */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E7B36]">
            ESTÚDIO DIGITAL PRIVADO • EXCLUSIVO DO PASTOR E EQUIPE
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#0F1E36] mt-1">
            Paz do Senhor, Pastor Geraldo Afonso!
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Escolha abaixo entre escrever seus conteúdos/artigos ou disparar no
            WhatsApp e copiar para o Facebook:
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[290px]">
          <button
            type="button"
            onClick={() => setActiveModule(1)}
            className={`text-left px-5 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
              activeModule === 1
                ? "bg-[#0F1E36] text-white border-[#0F1E36] shadow-md"
                : "bg-stone-50 text-[#0F1E36] border-stone-200 hover:bg-stone-100"
            }`}
          >
            <span className="text-lg">📝</span>
            <div>
              <span className="block text-[10px] uppercase tracking-wider opacity-75">
                MÓDULO 1
              </span>
              <span className="block text-xs font-bold">
                Criar Esboços, Artigos e Textos
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule(2)}
            className={`text-left px-5 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${
              activeModule === 2
                ? "bg-[#0F1E36] text-white border-[#0F1E36] shadow-md"
                : "bg-stone-50 text-[#0F1E36] border-stone-200 hover:bg-stone-100"
            }`}
          >
            <span className="text-lg">💬</span>
            <div>
              <span className="block text-[10px] uppercase tracking-wider opacity-75">
                MÓDULO 2
              </span>
              <span className="block text-xs font-bold">
                Gatilho WhatsApp & Copiar p/ Facebook
              </span>
            </div>
          </button>
        </div>
      </div>

      {feedbackBanner && (
        <div className="p-4 rounded-xl bg-emerald-950 text-white text-sm font-medium border-l-4 border-[#C5A059] shadow-md">
          {feedbackBanner}
        </div>
      )}

      {/* =====================================================================
          MÓDULO 1: CADERNO DE CRIAÇÃO PASTORAL
         ===================================================================== */}
      {activeModule === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0F1E36]">
                Caderno de Criação Pastoral
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Escreva ou dite seus esboços de pregação, artigos do blog,
                reflexões e anotações.
              </p>
            </div>

            {/* Botões de Acessibilidade e Voz */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleVoiceDictation("editor")}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  isRecordingVoice
                    ? "bg-red-600 text-white border-red-600 animate-pulse"
                    : "bg-stone-50 text-[#0F1E36] border-stone-300 hover:bg-stone-100"
                }`}
              >
                🎙️ {isRecordingVoice ? "Ouvindo sua voz..." : "Ditar por Voz"}
              </button>

              <button
                type="button"
                onClick={() => setPulpitMode((prev) => !prev)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                  pulpitMode
                    ? "bg-[#0F1E36] text-white border-[#0F1E36]"
                    : "bg-stone-50 text-[#0F1E36] border-stone-300 hover:bg-stone-100"
                }`}
              >
                👁️ Modo Púlpito (Letra Grande)
              </button>
            </div>

            {/* Abas de Categoria */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(
                [
                  "Artigo / Reflexão",
                  "Esboço de Pregação",
                  "Texto Pronto (Redes / WhatsApp)",
                  "Anotação Pastoral",
                ] as PastoralItemCategory[]
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-3 px-3 rounded-xl text-xs font-semibold border text-center transition-all ${
                    category === cat
                      ? "bg-[#0F1E36] text-white border-[#0F1E36] shadow-sm"
                      : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Campos de Título e Versículo */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  TÍTULO DO ESBOÇO, ARTIGO OU TEXTO
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold text-[#0F1E36] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  VERSÍCULO / TEXTO BASE
                </label>
                <input
                  type="text"
                  value={bibleVerse}
                  onChange={(e) => setBibleVerse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold text-[#0F1E36] focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Área de Texto Principal */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  CONTEÚDO COMPLETO
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTitle("");
                    setBibleVerse("");
                    setContent("");
                  }}
                  className="text-xs text-stone-500 underline hover:text-[#0F1E36]"
                >
                  Limpar folha para novo texto
                </button>
              </div>
              <textarea
                rows={pulpitMode ? 12 : 9}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full p-4 rounded-xl bg-stone-50 border border-stone-200 text-[#0F1E36] leading-relaxed focus:outline-none focus:border-[#C5A059] ${
                  pulpitMode ? "text-xl font-medium" : "text-sm"
                }`}
              />
            </div>

            {/* Quatro Botões de Ação Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => saveItem({ asReadyText: true })}
                className="py-3.5 px-4 rounded-xl bg-[#B38F40] hover:bg-[#9E7B36] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                ✨ Salvar e Virar Texto Pronto
              </button>

              <button
                type="button"
                onClick={() => saveItem({ publishToBlog: true })}
                className="py-3.5 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#1C3254] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                🌐 Publicar no Blog da Landing Page
              </button>

              <button
                type="button"
                onClick={() => saveItem({})}
                className="py-3.5 px-4 rounded-xl bg-white hover:bg-stone-50 text-[#0F1E36] border border-stone-200 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                📄 Apenas Salvar Rascunho / Esboço
              </button>

              <button
                type="button"
                onClick={() => saveItem({ goToWhatsappTrigger: true })}
                className="py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold uppercase tracking-wider transition-colors"
              >
                💬 Levar para Gatilho WhatsApp / Facebook &rarr;
              </button>
            </div>
          </div>

          {/* Coluna Direita: Textos Prontos & Esboços Salvos */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
                    Textos Prontos & Esboços Salvos
                  </h3>
                  <p className="text-xs text-stone-500">
                    Toque em qualquer item para editar ou enviar no WhatsApp
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-bold">
                  {savedTexts.length} salvos
                </span>
              </div>

              <div className="space-y-4 max-h-[540px] overflow-y-auto pr-1">
                {savedTexts.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-stone-50/80 border border-stone-200 space-y-2.5"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider">
                      <span className="text-[#9E7B36]">{item.category}</span>
                      <span className="text-stone-400">{item.bibleVerse}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-[#0F1E36]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-2">
                      {item.content}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCategory(item.category);
                          setTitle(item.title);
                          setBibleVerse(item.bibleVerse);
                          setContent(item.content);
                          showNotification(
                            "📝 Texto carregado no Caderno de Criação!"
                          );
                        }}
                        className="py-2 px-3 rounded-lg bg-white border border-stone-200 text-xs font-semibold text-[#0F1E36] hover:bg-stone-100"
                      >
                        Abrir no Editor
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setWhatsappBoldTitle(item.title);
                          setWhatsappBody(item.content);
                          setActiveModule(2);
                        }}
                        className="py-2 px-3 rounded-lg bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
                      >
                        Usar no WhatsApp / Facebook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MÓDULO 2: GATILHO WHATSAPP & COPIAR P/ FACEBOOK
         ===================================================================== */}
      {activeModule === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-serif font-bold text-[#0F1E36]">
                Publicar no WhatsApp & Copiar para o Facebook
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Prepare sua mensagem, veja ao lado como ela ficará e dispare com
                1 clique.
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => handleVoiceDictation("whatsapp")}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-stone-50 text-[#0F1E36] border border-stone-300 hover:bg-stone-100"
              >
                🎙️ Ditar Mensagem por Voz
              </button>
            </div>

            {/* Modo de Envio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSendMode("groups")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  sendMode === "groups"
                    ? "bg-[#0F1E36] text-white border-[#0F1E36]"
                    : "bg-stone-50 text-[#0F1E36] border-stone-200"
                }`}
              >
                <span className="block text-xs font-bold">
                  👥 Enviar p/ Grupos ou Lista
                </span>
                <span className="block text-[11px] opacity-80 mt-1">
                  Abre seu WhatsApp para escolher grupos ou contatos
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSendMode("person")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  sendMode === "person"
                    ? "bg-[#0F1E36] text-white border-[#0F1E36]"
                    : "bg-stone-50 text-[#0F1E36] border-stone-200"
                }`}
              >
                <span className="block text-xs font-bold">
                  👤 Enviar p/ Alguém Específico
                </span>
                <span className="block text-[11px] opacity-80 mt-1">
                  Digite o nome e telefone do irmão(ã) abaixo
                </span>
              </button>
            </div>

            {sendMode === "person" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-amber-50/60 border border-[#C5A059]/40">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    Nome do Irmão(ã)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Irmão Carlos"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">
                    WhatsApp com DDD
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: (31) 99999-0000"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-200 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Carregar Textos Prontos Salvos */}
            <div className="space-y-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                CARREGAR UM DOS SEUS TEXTOS PRONTOS SALVOS:
              </span>
              <div className="space-y-2">
                {savedTexts.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setWhatsappBoldTitle("PALAVRA DO PASTOR GERALDO AFONSO");
                      setWhatsappBody(item.content);
                    }}
                    className="w-full text-left px-4 py-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/50 border border-stone-200 text-xs font-bold text-[#0F1E36] transition-colors"
                  >
                    ✨ {item.title}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                TÍTULO EM NEGRITO (OPCIONAL)
              </label>
              <input
                type="text"
                value={whatsappBoldTitle}
                onChange={(e) => setWhatsappBoldTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 text-sm font-semibold text-[#0F1E36]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                TEXTO DA MENSAGEM / POST
              </label>
              <textarea
                rows={7}
                value={whatsappBody}
                onChange={(e) => setWhatsappBody(e.target.value)}
                className="w-full p-4 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#0F1E36] leading-relaxed"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-stone-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeTvLink}
                onChange={(e) => setIncludeTvLink(e.target.checked)}
                className="rounded text-[#0F1E36]"
              />
              <span>
                Incluir link da transmissão da TV Vida Abundante no final da
                mensagem
              </span>
            </label>
          </div>

          {/* Coluna Direita: Preview Ao Vivo do WhatsApp */}
          <div className="lg:col-span-6 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
                  👁️ Preview: Como a Mensagem Vai Ficar
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                  Ao Vivo
                </span>
              </div>

              {/* Moldura Simulador WhatsApp */}
              <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-inner bg-[#E5DDD5]">
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                    GA
                  </div>
                  <div>
                    <p className="text-xs font-bold leading-tight">
                      Pr. Geraldo Afonso (WhatsApp)
                    </p>
                    <p className="text-[10px] opacity-80">
                      Visualização antes do envio
                    </p>
                  </div>
                </div>

                <div className="p-5 max-h-[360px] overflow-y-auto">
                  <div className="bg-[#DCF8C6] text-[#111B21] p-4 rounded-xl rounded-tl-none shadow-sm text-xs leading-relaxed whitespace-pre-line">
                    {buildFormattedWhatsappMessage()}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSendWhatsappNow}
                className="w-full py-4 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                💬 1. Enviar pelo WhatsApp Agora
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyForFacebook(false)}
                  className="py-3.5 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#1C3254] text-white text-xs font-bold transition-colors"
                >
                  📋 2. Copiar Texto p/ Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handleCopyForFacebook(true)}
                  className="py-3.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-colors"
                >
                  🌐 Copiar e Abrir Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}