"use client";

import React, { useState } from "react";
import Link from "next/link";
import EstudioPastoralUnificado, {
  INITIAL_PASTORAL_TEXTS,
  SavedPastoralText,
} from "@/components/estudio/EstudioPastoralUnificado";
import { OFFICIAL_PHOTOS } from "@/lib/real-biography-data";

const FOUR_BOOKS = [
  {
    id: "vida-que-deus-preparou",
    tag: "Best-Seller Ministerial",
    title: "A Vida Que Deus Preparou Para Mim",
    subtitle: "Princípios de fé para viver o plano perfeito do Pai — O Código Sagrado",
    description:
      "Descubra o Código Sagrado (Crer e Obedecer) para sair de uma vida de estagnação espiritual e entrar nas pastagens verdejantes do propósito divino.",
    physicalPrice: "R$ 49,90",
    ebookPrice: "R$ 29,90",
    coverUrl: OFFICIAL_PHOTOS.bookCoverVidaDeus,
    sampleExcerpt:
      "\"Muitos cristãos complicam o que Deus simplificou. Se você observar a trajetória de cada herói da fé na Bíblia, perceberá que todos eles operaram sob dois princípios fundamentais: Crer e Obedecer.\"",
  },
  {
    id: "gloriosas-recompensas-depressao",
    tag: "Leitura de Cura Interior",
    title: "As Gloriosas Recompensas da Depressão",
    subtitle: "Como eu e minha esposa vencemos a depressão: Do Altar ao Vale",
    description:
      "Um relato honesto, comovente e libertador que quebra o tabu religioso sobre a depressão. O Pr. Geraldo abre o coração sobre sua jornada até a cura.",
    physicalPrice: "R$ 44,90",
    ebookPrice: "R$ 24,90",
    coverUrl: OFFICIAL_PHOTOS.bookCoverDepressao,
    sampleExcerpt:
      "\"A depressão não é um sinal de falta de fé, mas muitas vezes é o campo de batalha onde Deus forja a nossa maior autoridade. O deserto é temporário, mas a sensibilidade espiritual que você ganhará nele será eterna.\"",
  },
  {
    id: "hierarquia-e-submissao",
    tag: "Formação de Líderes",
    title: "Hierarquia e Submissão no Contexto Eclesiástico",
    subtitle: "Princípios de autoridade espiritual, ordem e honra na Casa de Deus",
    description:
      "Uma obra essencial para obreiros, pastores e líderes que desejam compreender a proteção espiritual gerada pela ordem bíblica e união na Igreja.",
    physicalPrice: "R$ 39,90",
    ebookPrice: "R$ 22,90",
    coverUrl: OFFICIAL_PHOTOS.bookCoverHierarquia,
    sampleExcerpt:
      "\"Princípios Bíblicos para uma Igreja Forte, Unida e Alinhada com a Vontade de Deus, protegendo o rebanho contra rebeliões e divisões.\"",
  },
  {
    id: "usos-e-costumes",
    tag: "Doutrina & Vida Cristã",
    title: "Usos e Costumes na Igreja de Cristo",
    subtitle: "Santidade, identidade cristã e equilíbrio bíblico no mundo contemporâneo",
    description:
      "Uma análise madura e fundamentada nas Escrituras sobre santificação, testemunho cristão e zelo pela Casa de Deus em tempos de relativismo.",
    physicalPrice: "R$ 39,90",
    ebookPrice: "R$ 22,90",
    coverUrl: OFFICIAL_PHOTOS.bookCoverHierarquia,
    sampleExcerpt:
      "\"A santidade bíblica e o testemunho cristão autêntico refletem a luz de Cristo em meio a uma geração que tenta relativizar os princípios eternos da Palavra.\"",
  },
];

export default function UnifiedPortalAndStudioPage() {
  const [fontScale, setFontScale] = useState<"normal" | "lg" | "xl">("normal");
  const [isPrivateStudioOpen, setIsPrivateStudioOpen] = useState(false);
  const [blogPosts, setBlogPosts] = useState<SavedPastoralText[]>(
    INITIAL_PASTORAL_TEXTS
  );
  const [selectedBookSample, setSelectedBookSample] = useState<
    (typeof FOUR_BOOKS)[0] | null
  >(null);

  // Estados do Formulário de Aconselhamento na Landing Page
  const [cName, setCName] = useState("");
  const [cCity, setCCity] = useState("");
  const [cReason, setCReason] = useState("Oração pela Família e Casamento");
  const [cText, setCText] = useState("");

  const fontSizeClass =
    fontScale === "xl"
      ? "text-lg"
      : fontScale === "lg"
      ? "text-base"
      : "text-sm";

  async function handleCounselingWhatsapp(e: React.FormEvent) {
    e.preventDefault();
    // Salva também criptografado na Central Ministerial (LGPD)
    try {
      await fetch("/api/counseling", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: cName || "Irmão(ã)",
          contactInfo: cCity || "Via WhatsApp Landing Page",
          subjectCategory: "Pedido de Oração",
          message: `[${cReason}] ${cText}`,
          lgpdConsent: true,
        }),
      });
    } catch {
      // prossegue para o WhatsApp
    }

    const msg = encodeURIComponent(
      `*PEDIDO DE ORAÇÃO / ACONSELHAMENTO*\n\n*Nome:* ${cName}\n*Cidade/Igreja:* ${cCity}\n*Motivo:* ${cReason}\n\n*Mensagem:* ${cText}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, "_blank");
  }

  if (isPrivateStudioOpen) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] py-6 px-4 sm:px-8 max-w-7xl mx-auto">
        <EstudioPastoralUnificado
          defaultModule={1}
          showTopHeader={true}
          onBackToPublicSite={() => setIsPrivateStudioOpen(false)}
          onPublishToLandingBlog={(newItem) =>
            setBlogPosts((prev) => [newItem, ...prev])
          }
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#FAF8F5] text-[#0F1E36] ${fontSizeClass}`}>
      {/* Barra de Navegação Superior */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#C5A059] bg-white flex items-center justify-center font-serif font-bold text-[#0F1E36] shadow-sm">
              GA
            </div>
            <div>
              <span className="font-serif font-bold text-lg text-[#0F1E36] block leading-none">
                Pr. Geraldo Afonso
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#9E7B36] font-semibold">
                MINISTÉRIO VIDA ABUNDANTE • IPUB
              </span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6 text-xs font-medium text-stone-700">
            <a href="#biografia" className="hover:text-[#0F1E36]">
              Bibliografia e Testemunhos
            </a>
            <a href="#loja" className="hover:text-[#0F1E36]">
              Loja Online
            </a>
            <a href="#ipub" className="hover:text-[#0F1E36]">
              IPUB
            </a>
            <a href="#tv" className="hover:text-[#0F1E36]">
              TV Vida Abundante
            </a>
            <a href="#blog" className="hover:text-[#0F1E36]">
              Artigos & Blog
            </a>
            <a
              href="#aconselhamento"
              className="px-4 py-2 rounded-full bg-[#0F1E36] text-white font-semibold hover:bg-[#1C3254]"
            >
              Aconselhamento
            </a>
          </nav>

          {/* Controle de Fonte (A / A+ / A++) + Link Central */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-stone-200 rounded-full p-1">
              <button
                type="button"
                onClick={() => setFontScale("normal")}
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  fontScale === "normal"
                    ? "bg-[#0F1E36] text-white"
                    : "text-stone-600"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontScale("lg")}
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  fontScale === "lg"
                    ? "bg-[#0F1E36] text-white"
                    : "text-stone-600"
                }`}
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontScale("xl")}
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  fontScale === "xl"
                    ? "bg-[#0F1E36] text-white"
                    : "text-stone-600"
                }`}
              >
                A++
              </button>
            </div>

            <Link
              href="/central"
              className="px-3.5 py-2 rounded-full border border-[#C5A059] text-[#0F1E36] text-xs font-bold hover:bg-amber-50"
            >
              Painel Central GA
            </Link>
          </div>
        </div>
      </header>

      {/* Seção Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/70 text-[#0F1E36] text-xs font-bold uppercase tracking-wider">
            <span>🎖️ MAIS DE 5 DÉCADAS SERVINDO AO REINO DE DEUS NO BRASIL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#0F1E36] leading-tight">
            Uma vida dedicada à Oração, à Palavra e à Família.
          </h1>

          <p className="text-stone-600 leading-relaxed text-base">
            Aos 73 anos e com mais de 50 anos de ministério, o{" "}
            <strong>Pastor Geraldo Afonso</strong> é um dos pilares da Igreja
            Pentecostal Unida do Brasil (IPUB). Autor, conselheiro espiritual e
            fundador da <em>TV Vida Abundante</em>, ensina o Código Sagrado da
            fé que ultrapassa todos os limites humanos.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#aconselhamento"
              className="px-6 py-3.5 rounded-xl bg-[#0F1E36] hover:bg-[#1C3254] text-white font-semibold text-xs uppercase tracking-wider shadow-sm"
            >
              💬 Aconselhamento no WhatsApp
            </a>
            <a
              href="#loja"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-[#0F1E36] border border-stone-300 font-semibold text-xs uppercase tracking-wider"
            >
              📖 Conhecer os Livros
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-200">
            <div>
              <p className="text-2xl font-serif font-bold text-[#0F1E36]">
                50+ Anos
              </p>
              <p className="text-xs text-stone-500">De Ministério Pastoral</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-[#0F1E36]">
                4 Obras
              </p>
              <p className="text-xs text-stone-500">Livros Publicados</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-bold text-[#0F1E36]">
                Milhares
              </p>
              <p className="text-xs text-stone-500">De Vidas Aconselhadas</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-lg">
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100">
              <img
                src={OFFICIAL_PHOTOS.portrait}
                alt="Pastor Geraldo Afonso"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="pt-3 px-1 flex items-center justify-between">
              <p className="font-serif italic text-xs text-stone-700">
                Pr. Geraldo Afonso & Esposa — Aliança, Ministério e Família
              </p>
              <span className="text-[11px] font-bold text-[#9E7B36]">IPUB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Bibliografia e Testemunhos (4 Cards) */}
      <section
        id="biografia"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E7B36]">
            HISTÓRIA VIVA DE FÉ E SOBRENATURAL
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0F1E36] mt-1">
            Bibliografia e Testemunhos
          </h2>
          <p className="text-stone-600 mt-1 max-w-2xl">
            O que o Pastor Geraldo Afonso prega nos púlpitos e escreve em seus
            livros não são teorias humanas, mas princípios testados no fogo de
            grandes provações e milagres reais presenciados ao lado de sua
            família.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F1E36] text-[#C5A059] text-xs font-bold">
              1983
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
              Do Conforto de BH ao Sertão da Bahia e a Vitória sobre a Depressão
            </h3>
            <p className="text-xs font-semibold text-[#9E7B36]">
              O chamado missionário e o milagre através de 2 Coríntios 10:4
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Deixando a estabilidade na rede hoteleira em Belo Horizonte, o Pr.
              Geraldo partiu com a esposa e as filhas gêmeas para o sertão da
              Bahia. Quando sua esposa enfrentou uma severa depressão, tornou-se
              seu guardião em tempo integral por um ano, lendo a Palavra no
              terreiro de madrugada até a libertação completa após a oração de
              um missionário americano.
            </p>
            <p className="text-[11px] italic text-stone-500 pt-2 border-t border-stone-100">
              &ldquo;Porque as armas da nossa milícia não são carnais, mas, sim,
              poderosas em Deus, para destruição das fortalezas. (2 Coríntios
              10:4)&rdquo;
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F1E36] text-[#C5A059] text-xs font-bold">
              1991
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
              O Grave Acidente de Kombi e a Cura da Fratura Craniana
            </h3>
            <p className="text-xs font-semibold text-[#9E7B36]">
              Sentenciado à cirurgia de alto risco às 3h da manhã, liberado
              curado às 6h
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Preso às ferragens após um acidente na estrada rumo a Belo
              Horizonte, foi diagnosticado com traumatismo craniano grave.
              Enquanto aguardava a equipe de neurocirurgia na madrugada, um
              pastor e dois irmãos oraram por cinco minutos no hospital. No
              último exame antes do centro cirúrgico, os médicos constataram
              perplexos que não havia mais nenhuma fratura.
            </p>
            <p className="text-[11px] italic text-stone-500 pt-2 border-t border-stone-100">
              &ldquo;Tudo é possível ao que crê. (Marcos 9:23)&rdquo;
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F1E36] text-[#C5A059] text-xs font-bold">
              1992
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
              A Página da Bíblia que Tremulou na Madrugada
            </h3>
            <p className="text-xs font-semibold text-[#9E7B36]">
              A vitória pessoal contra a depressão e a lei da semeadura extrema
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enfrentando a própria depressão e a escassez severa após o
              acidente, orava de madrugada em uma sala fechada quando viu uma
              página da Bíblia tremular sem vento sobre Lucas 6:38 (&lsquo;Dai,
              e dar-se-vos-á&rsquo;). Após doar roupas, tíquetes-refeição e até
              os vales-transporte — caminhando de madrugada para o trabalho —,
              recebeu uma proposta profissional dez vezes maior no mesmo mês.
            </p>
            <p className="text-[11px] italic text-stone-500 pt-2 border-t border-stone-100">
              &ldquo;Dai, e dar-se-vos-á; boa medida, recalcada, sacudida e
              transbordante vos darão. (Lucas 6:38)&rdquo;
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F1E36] text-[#C5A059] text-xs font-bold">
              1998 – 2014
            </span>
            <h3 className="text-lg font-serif font-bold text-[#0F1E36]">
              16 Anos de Fé Inabalável e a Cura Sobrenatural do Esôfago
            </h3>
            <p className="text-xs font-semibold text-[#9E7B36]">
              Dos 85 kg aos 40 kg sem nunca cancelar a agenda de pregações
            </p>
            <p className="text-xs text-stone-600 leading-relaxed">
              Diagnosticado com estreitamento severo do esôfago devido à Doença
              de Chagas, não conseguia reter nem líquidos e chegou a pesar 40
              kg. Ouvindo a direção clara de Deus para depender exclusivamente
              d&apos;Ele, manteve as viagens e seminários pelo Brasil até
              receber a cura completa e sobrenatural, sem cirurgias ou
              medicamentos.
            </p>
            <p className="text-[11px] italic text-stone-500 pt-2 border-t border-stone-100">
              &ldquo;O ânimo espiritual não depende de como o nosso corpo se
              sente, mas de onde a nossa alma está ancorada.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Seção Loja Online — 4 Obras */}
      <section
        id="loja"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8"
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#9E7B36]">
            LITERATURA CRISTÃ & EDIFICAÇÃO
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#0F1E36] mt-1">
            Loja Online — Obras do Pr. Geraldo Afonso
          </h2>
          <p className="text-stone-600 mt-1">
            Adquira os livros físicos enviados pelo correio ou receba a versão
            digital (E-book PDF) diretamente no seu WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] bg-[#0F1E36]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-semibold">
                    {book.tag}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-base text-[#0F1E36]">
                    {book.title}
                  </h3>
                  <p className="text-[11px] text-stone-500">{book.subtitle}</p>
                  <p className="text-xs text-stone-600 line-clamp-3">
                    {book.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs pt-3 border-t border-stone-100">
                  <span>
                    Físico: <strong>{book.physicalPrice}</strong>
                  </span>
                  <span className="text-[#9E7B36]">
                    E-book: <strong>{book.ebookPrice}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedBookSample(book)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0F1E36] hover:bg-[#1C3254] text-white text-xs font-semibold transition-colors"
                >
                  📖 Comprar / Ler Amostra
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de Leitura de Amostra e Compra via WhatsApp */}
      {selectedBookSample && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9E7B36]">
                  {selectedBookSample.tag}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0F1E36]">
                  {selectedBookSample.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBookSample(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>
            <blockquote className="p-4 rounded-xl bg-stone-50 border-l-4 border-[#C5A059] text-xs italic text-stone-700 leading-relaxed">
              {selectedBookSample.sampleExcerpt}
            </blockquote>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `A Paz do Senhor! Gostaria de adquirir o livro FÍSICO "${selectedBookSample.title}" (${selectedBookSample.physicalPrice}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#0F1E36] text-white text-xs font-bold text-center"
              >
                📦 Pedir Livro Físico ({selectedBookSample.physicalPrice})
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `A Paz do Senhor! Gostaria de adquirir o E-BOOK DIGITAL "${selectedBookSample.title}" (${selectedBookSample.ebookPrice}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#16A34A] text-white text-xs font-bold text-center"
              >
                📱 Pedir E-book PDF ({selectedBookSample.ebookPrice})
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Seção IPUB e TV Vida Abundante */}
      <section
        id="ipub"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E7B36]">
              🏛️ PILAR E LIDERANÇA HISTÓRICA
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0F1E36]">
              Igreja Pentecostal Unida do Brasil (IPUB)
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Com mais de meio século de dedicação ao altar, o Pastor Geraldo
              Afonso é uma das grandes referências espirituais, doutrinárias e
              intelectuais da IPUB no Brasil. Seu ministério é marcado pela
              formação de obreiros, seminários de avivamento, zelo pela sã
              doutrina e cuidado pastoral próximo das famílias.
            </p>
            <ul className="space-y-2 text-xs text-stone-700 font-medium pt-2">
              <li>✓ Ensino profundo da Palavra, jejum, oração e santificação.</li>
              <li>✓ Seminários e conferências de fé em diversas regiões do país.</li>
              <li>✓ Acompanhamento de pastores, líderes e famílias.</li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white p-3 rounded-2xl border border-stone-200 shadow-sm">
              <img
                src={OFFICIAL_PHOTOS.churchFacade}
                alt="Templo da Igreja Pentecostal Unida do Brasil (IPUB)"
                className="w-full h-64 object-cover rounded-xl"
              />
              <p className="text-[11px] text-stone-500 mt-2 px-1">
                Templo da Igreja Pentecostal Unida do Brasil (IPUB) — Casa de
                oração, ensino e comunhão.
              </p>
            </div>
          </div>
        </div>

        {/* TV Vida Abundante */}
        <div id="tv" className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E7B36]">
              TRANSMISSÕES AO VIVO & MENSAGENS
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0F1E36] mt-1">
              TV Vida Abundante — Pr. Geraldo Afonso
            </h2>
            <p className="text-stone-600 mt-1 text-xs sm:text-sm">
              Assista às pregações ao vivo e estudos bíblicos transmitidos pelo
              YouTube, Facebook e Instagram para edificar a sua fé.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PToM1532YMo"
                title="O Que a Fé Pode Fazer, ultrapassa limites | Pr. Geraldo Afonso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-red-700 uppercase">
                ▶ Mensagem em Destaque • 2 Crônicas 20:1-15
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#0F1E36]">
                O Que a Fé Pode Fazer, Ultrapassa Limites | Pr. Geraldo Afonso
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mensagem pregada após o fortalecimento sobrenatural do Espírito
                Santo. Uma convocação para vencer a lógica humana, enfrentar o
                &ldquo;E se?&rdquo; através do jejum e da oração como o rei
                Josafá e sustentar a fé durante o processo.
              </p>
              <a
                href="https://www.youtube.com/live/PToM1532YMo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#0F1E36] text-white text-xs font-semibold hover:bg-[#1C3254]"
              >
                Assistir no YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Artigos, Mensagens & Blog Pastoral */}
      <section
        id="blog"
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-8"
      >
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#0F1E36]">
            Artigos, Mensagens & Blog Pastoral
          </h2>
          <p className="text-stone-600 mt-1 text-xs sm:text-sm">
            Textos e estudos bíblicos escritos pelo Pastor Geraldo Afonso para o
            fortalecimento diário da sua caminhada com Deus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#9E7B36]">
                    {post.category}
                  </span>
                  <span className="text-stone-400">{post.dateLabel}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#0F1E36]">
                  {post.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-4 whitespace-pre-line">
                  {post.content}
                </p>
              </div>
              <Link
                href="/mensagens"
                className="text-xs font-bold text-[#0F1E36] hover:text-[#9E7B36]"
              >
                Ler artigo completo &rsaquo;
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Seção Precisa de Oração ou Aconselhamento Pastoral */}
      <section
        id="aconselhamento"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14"
      >
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200 shadow-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-[#C5A059]/40 flex items-center justify-center text-lg">
              🤍
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#0F1E36]">
              Precisa de Oração ou Aconselhamento Pastoral?
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed">
              O Pastor Geraldo Afonso dedica parte de sua rotina diária para
              ouvir, aconselhar pela Palavra e orar por famílias, casamentos,
              causas emocionais e ministeriais diretamente pelo WhatsApp e com
              registro protegido na Central Ministerial.
            </p>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
              <strong className="block text-[#0F1E36] mb-0.5">
                &ldquo;A peleja não é vossa, mas é de Deus.&rdquo;
              </strong>
              Preencha os campos ao lado e sua mensagem já chegará organizada no
              WhatsApp do Pastor Geraldo.
            </div>
          </div>

          <form
            onSubmit={handleCounselingWhatsapp}
            className="md:col-span-7 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                  SEU NOME
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Irmão João / Irmã Maria"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                  SUA CIDADE / IGREJA
                </label>
                <input
                  type="text"
                  placeholder="Ex: Belo Horizonte - MG"
                  value={cCity}
                  onChange={(e) => setCCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                MOTIVO DA CONVERSA OU ORAÇÃO
              </label>
              <select
                value={cReason}
                onChange={(e) => setCReason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
              >
                <option>Oração pela Família e Casamento</option>
                <option>Superação Emocional e Depressão</option>
                <option>Cura Divina e Saúde</option>
                <option>Aconselhamento Ministerial / Obreiros</option>
                <option>Convite para Ministração</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">
                ESCREVA BREVEMENTE SEU PEDIDO
              </label>
              <textarea
                rows={4}
                required
                placeholder="Compartilhe aqui para que o Pastor Geraldo possa orar e orientar você..."
                value={cText}
                onChange={(e) => setCText(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
            >
              💬 Chamar Pastor Geraldo no WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* Rodapé com Acesso Restrito do Pastor */}
      <footer className="border-t border-stone-200 mt-14 py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            <strong className="text-[#0F1E36]">
              Ministério Pastor Geraldo Afonso • TV Vida Abundante
            </strong>{" "}
            — Igreja Pentecostal Unida do Brasil (IPUB).
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setIsPrivateStudioOpen(true)}
              className="text-stone-500 hover:text-[#0F1E36] font-medium flex items-center gap-1.5"
            >
              🔒 Acesso Restrito do Pastor (Estúdio Rápido)
            </button>
            <Link
              href="/central"
              className="text-[#9E7B36] hover:underline font-semibold"
            >
              Central Ministerial Completa &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}