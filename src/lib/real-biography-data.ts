export interface BiographicalMilestone {
  year: string;
  location: string;
  title: string;
  description: string;
  sourceReference: string;
}

export const PASTOR_BIOGRAPHY_SUMMARY = {
  fullName: "Pastor Geraldo Afonso",
  age: 73,
  ministryYears: "Mais de 50 anos de ministério",
  churchName: "Igreja Pentecostal Unida do Brasil (IPUB)",
  youtubeChannel: "TV VIDA ABUNDANTE PASTOR GERALDO AFONSO",
  youtubeSampleUrl: "http://www.youtube.com/watch?v=PToM1532YMo",
  shortBio:
    "Aos 73 anos e com mais de cinco décadas de ministério ininterrupto, o Pastor Geraldo Afonso é reconhecido como um dos pilares e grandes líderes da igreja evangélica no Brasil. Pregador no Brasil e no exterior, escritor, professor e conselheiro de líderes e famílias, une profundo saber bíblico a uma vida consagrada à oração, ao ensino da Palavra e ao cuidado pastoral.",
  welcomeQuote:
    "O que compartilho não são meras teorias, mas experiências que presenciei, vi, ouvi e vivi ao longo de anos pregando a Palavra de Deus, tanto no Brasil quanto no exterior. O segredo que muitos ainda não compreenderam é a simplicidade da fé: Crer e Obedecer.",
};

export const OFFICIAL_PHOTOS = {
  portrait: "/assets/pastor-esposa-oficial.jpg",         // Atualizado para a foto com a esposa
  pulpitPreaching: "/assets/pastor-pulpito-dt725.jpg",    // IMG_9864.jpg
  altarMinistry: "/assets/pastor-altar-igreja.jpg",       // IMG_8521.jpg
  churchFacade: "/assets/fachada-ipub.jpg",               // WhatsApp Image 2026-11-06 at 09.49.51.jpg
  coupleBackCover: "/assets/casal-capa-contra.png",       // capacontra.png
  bookCoverDepressao: "/assets/capa-recompensas-depressao.png",
  bookCoverVidaDeus: "/assets/capa-vida-que-deus-preparou.jpg",
  bookCoverHierarquia: "/assets/capa-hierarquia-submissao.png",
};

export const HOMOLOGATED_TIMELINE: BiographicalMilestone[] = [
  {
    year: "Década de 1970",
    location: "Brasil",
    title: "Início da Caminhada Ministerial e Vocação",
    description:
      "Início de uma trajetória de mais de 50 anos dedicados à pregação do Evangelho, ao ensino das Escrituras e à formação de obreiros e líderes, alicerçada na disciplina das madrugadas de oração herdada de sua mãe.",
    sourceReference: "Acervo Biográfico Oficial / Livro As Gloriosas Recompensas da Depressão, Cap. 1",
  },
  {
    year: "1983",
    location: "Belo Horizonte (MG) e Sertão da Bahia",
    title: "Renúncia Profissional e Missão no Sertão Baiano",
    description:
      "Atuando em uma grande rede de hotelaria em Belo Horizonte e pregando aos finais de semana em Minas Gerais, respondeu ao chamado missionário voluntário para assumir uma obra carente no sertão da Bahia ao lado de sua esposa e filhas gêmeas.",
    sourceReference: "Livro As Gloriosas Recompensas da Depressão, Capítulos 1 a 3",
  },
  {
    year: "1983 – 1984",
    location: "Belo Horizonte (MG)",
    title: "O Guardião da Alma, Restauração Familiar e Evangelismo Regional",
    description:
      "Período de dedicação integral à restauração da saúde emocional de sua esposa por meio da Palavra e da oração nas madrugadas, culminando em libertação completa após intercessão pastoral baseada em 2 Coríntios 10:3-5 e retorno como Evangelista Regional.",
    sourceReference: "Livro As Gloriosas Recompensas da Depressão, Capítulos 4 a 7",
  },
  {
    year: "1991",
    location: "Minas Gerais / Belo Horizonte",
    title: "O Milagre após o Acidente na Estrada e a Superação do Vale",
    description:
      "Sobreviveu de forma sobrenatural a um grave acidente automobilístico com diagnóstico de fratura craniana severa revertido após oração no hospital em Belo Horizonte. Superou em seguida sua própria batalha contra a depressão e a escassez através do princípio de Lucas 6:38.",
    sourceReference: "Livro As Gloriosas Recompensas da Depressão, Capítulos 8 a 11",
  },
  {
    year: "1998 – 2014",
    location: "Brasil e Exterior",
    title: "Perseverança nos Seminários, Avivamento e Cura Divina",
    description:
      "Mesmo enfrentando 16 anos de severa provação física decorrente da Doença de Chagas (chegando aos 40 kg), manteve ininterrupta sua agenda de seminários e pregações pelo país até receber a cura completa e sobrenatural em 2014.",
    sourceReference: "Livro A Vida Que Deus Preparou Para Mim, Capítulo 4",
  },
  {
    year: "Atualidade (73 anos)",
    location: "Minas Gerais / Brasil",
    title: "Liderança Consolidada, Obras Literárias e TV Vida Abundante",
    description:
      "Autor de quatro obras de edificação cristã e liderança eclesiástica, segue pregando presencialmente na Igreja Pentecostal Unida do Brasil, aconselhando vidas e transmitindo mensagens pelas redes sociais e pela TV Vida Abundante.",
    sourceReference: "Acervo Oficial Projeto GA (2026)",
  },
];