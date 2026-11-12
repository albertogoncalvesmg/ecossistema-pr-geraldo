import {
  PrismaClient,
  Role,
  ContentType,
  ApprovalStatus,
  ArchiveMaterialType,
} from "@prisma/client";
import { hashPassword } from "../src/lib/crypto";
import { OFFICIAL_PHOTOS } from "../src/lib/real-biography-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Sincronizando Acervo Real do Pastor Geraldo Afonso no banco de dados...");

  const defaultPasswordHash = await hashPassword("ProjetoGA@2026!");

  // 1. Perfis de Acesso (RBAC)
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@geraldoafonso.com.br" },
    update: {},
    create: {
      name: "Administrador de Tecnologia GA",
      email: "admin@geraldoafonso.com.br",
      passwordHash: defaultPasswordHash,
      role: Role.ADMIN,
    },
  });

  const pastorUser = await prisma.user.upsert({
    where: { email: "pastor@geraldoafonso.com.br" },
    update: {},
    create: {
      name: "Pr. Geraldo Afonso",
      email: "pastor@geraldoafonso.com.br",
      passwordHash: defaultPasswordHash,
      role: Role.PASTOR,
    },
  });

  await prisma.user.upsert({
    where: { email: "comunicacao@geraldoafonso.com.br" },
    update: {},
    create: {
      name: "Equipe de Comunicação GA",
      email: "comunicacao@geraldoafonso.com.br",
      passwordHash: defaultPasswordHash,
      role: Role.COMUNICACAO,
    },
  });

  await prisma.user.upsert({
    where: { email: "pastoral@geraldoafonso.com.br" },
    update: {},
    create: {
      name: "Equipe de Cuidado Pastoral GA",
      email: "pastoral@geraldoafonso.com.br",
      passwordHash: defaultPasswordHash,
      role: Role.PASTORAL,
    },
  });

  // 2. Biblioteca de Livros Reais Homologados
  await prisma.book.upsert({
    where: { slug: "as-gloriosas-recompensas-da-depressao" },
    update: {},
    create: {
      slug: "as-gloriosas-recompensas-da-depressao",
      title: "As Gloriosas Recompensas da Depressão",
      subtitle:
        "Como eu e minha esposa vencemos a depressão — Uma história real de fé, dor, superação e do amor incondicional de Deus",
      author: "Pr. Geraldo Afonso",
      coverUrl: OFFICIAL_PHOTOS.bookCoverDepressao,
      description:
        "Relato autobiográfico e pastoral profundo dividido em 11 capítulos. O Pastor Geraldo Afonso abre o coração sobre o período em que sua esposa e, posteriormente, ele próprio atravessaram e venceram o vale da depressão.",
      synopsis:
        "Muitos acreditam que a vida com Deus é um escudo contra as tempestades da mente, mas o vale da sombra da morte não escolhe cargo ou nível de consagração. Nesta obra real, o Pr. Geraldo Afonso narra desde a missão na Bahia em 1983, as madrugadas de clamor, o grave acidente de 1991 e a superação completa da dor emocional até a conquista de uma profunda sensibilidade espiritual para socorrer os aflitos.",
      authorizedExcerpt:
        "\"Muitos acreditam que a vida com Deus é um escudo contra as tempestades da mente, mas a verdade é que o vale da sombra da morte não escolhe religião, cargo ou nível de consagração. Eu estive lá. Neste livro, abro o meu coração para mostrar que a depressão não é um sinal de falta de fé, mas muitas vezes é o campo de batalha onde Deus forja a nossa maior autoridade. O deserto é temporário, mas a sensibilidade espiritual que você ganhará nele será eterna. Você é, em Cristo Jesus, mais que vencedor.\"",
      format: "Impresso e Digital (11 Capítulos)",
      isFeatured: true,
      isActive: true,
      isDemoData: false,
    },
  });

  await prisma.book.upsert({
    where: { slug: "a-vida-que-deus-preparou-para-mim" },
    update: {},
    create: {
      slug: "a-vida-que-deus-preparou-para-mim",
      title: "A Vida Que Deus Preparou Para Mim",
      subtitle:
        "Princípios de fé para viver o plano perfeito do Pai — Descubra o Código Sagrado para sair de uma vida normal e viver o plano extraordinário do Pai",
      author: "Pr. Geraldo Afonso",
      coverUrl: OFFICIAL_PHOTOS.bookCoverVidaDeus,
      description:
        "Obra completa em 11 capítulos na qual o Pastor Geraldo Afonso compartilha princípios revelados por décadas de experiência ministerial no Brasil e no exterior, desvendando o Código Sagrado: Crer e Obedecer.",
      synopsis:
        "Através de uma jornada bíblica e prática que passa pela Paternidade Divina, a ousadia da oração de Jabez (1 Crônicas 4:9-10), a quebra da falsa resignação espiritual, o testemunho real de cura após 16 anos de provação (1998–2014), o poder da gratidão, o mistério da semente e a diferença entre riqueza e verdadeira prosperidade, este livro conduz o leitor ao centro da vontade do Pai.",
      authorizedExcerpt:
        "\"Escrevo estas páginas com o coração ardendo na esperança de abençoar sua vida. O que compartilho aqui não são meras teorias, mas experiências que presenciei, vi, ouvi e vivi ao longo de anos pregando a Palavra de Deus, tanto no Brasil quanto no exterior. O segredo que muitos ainda não compreenderam é a simplicidade da fé. Se você observar a trajetória de cada herói da fé na Bíblia, perceberá que todos eles operaram sob dois princípios fundamentais: Crer e Obedecer.\"",
      format: "Impresso e Digital (108 Páginas / 11 Capítulos)",
      isFeatured: true,
      isActive: true,
      isDemoData: false,
    },
  });

  await prisma.book.upsert({
    where: { slug: "hierarquia-e-submissao-no-contexto-eclesiastico" },
    update: {},
    create: {
      slug: "hierarquia-e-submissao-no-contexto-eclesiastico",
      title: "Hierarquia e Submissão no Contexto Eclesiástico",
      subtitle:
        "Princípios Bíblicos para uma Igreja Forte, Unida e Alinhada com a Vontade de Deus",
      author: "Pr. Geraldo Afonso",
      coverUrl: OFFICIAL_PHOTOS.bookCoverHierarquia,
      description:
        "Manual de formação de liderança cristã, ordem bíblica e maturidade ministerial voltado a pastores, obreiros e membros que desejam edificar uma igreja saudável e inabalável.",
      synopsis:
        "Fundamentado nas Escrituras Sagradas e em mais de meio século de experiência pastoral, o Pastor Geraldo Afonso ensina como a autoridade espiritual legítima, a honra e a submissão bíblica protegem o rebanho contra divisões e promovem a unidade do Corpo de Cristo.",
      authorizedExcerpt:
        "\"Uma igreja forte, unida e alinhada com a vontade de Deus é edificada quando líderes e liderados compreendem que os princípios de ordem, honra e submissão espiritual não são fardos humanos, mas a própria proteção divina para que a bênção do Senhor flua sobre todo o rebanho.\"",
      format: "Impresso e Digital",
      isFeatured: true,
      isActive: true,
      isDemoData: false,
    },
  });

  // 3. Mensagens e Estudos Reais (YouTube Live + Estudos Extraídos das Obras)
  await prisma.ministerialContent.upsert({
    where: { slug: "o-que-a-fe-pode-fazer-ultrapassa-limites" },
    update: {},
    create: {
      slug: "o-que-a-fe-pode-fazer-ultrapassa-limites",
      title: "O Que a Fé Pode Fazer Ultrapassa Todos os Recursos Humanos",
      subtitle: "Ministração ao vivo na TV Vida Abundante — Baseada em 2 Crônicas 20",
      type: ContentType.SERMON,
      category: "Fé e Oração",
      biblicalReference: "2 Crônicas 20:1-15; Romanos 4:17-18",
      summary:
        "Pregação ministrada pelo Pr. Geraldo Afonso sobre o combate entre a lógica humana e o mistério da fé, o posicionamento de Josafá diante da grande multidão e o poder do jejum com arrependimento para alinhar nossa vida à vontade de Deus.",
      bodyText: `Nesta mensagem transmitida pela TV Vida Abundante, o Pastor Geraldo Afonso medita em 2 Crônicas 20, quando três exércitos se levantaram contra o rei Josafá.\n\n1. O COMBATE ENTRE A RAZÃO E O MISTÉRIO DA FÉ\nA lucidez da nossa mente e o mistério da fé estão sempre em combate. Na hora de colocar a fé em ação, a primeira atitude é enfrentar os próprios pensamentos e a lógica meramente humana. Conforme Romanos 4:17-18, a fé chama à existência as coisas que não existem. Você demonstra que crê quando age pela Palavra.\n\n2. A FÉ É UMA DECISÃO PESSOAL E INTRANSFERÍVEL\nDiante do relatório dos generais de que não havia chance humana, Josafá temeu, mas tomou a decisão certa: não buscou socorro no Egito; apregoou jejum em todo o Judá e confessou: "Em nós não há força perante esta grande multidão que vem contra nós, e não sabemos nós o que faremos; porém os nossos olhos estão postos em Ti" (2 Crônicas 20:12).\n\n3. VENCENDO O GIGANTE DO "E SE..." NO MEIO DO PROCESSO\nEntre a promessa liberada pelo Espírito do Senhor ("a peleja não é vossa, mas é de Deus") e a derrota dos inimigos, existe o processo. É no meio do processo que precisamos derrotar a dúvida do "e se Deus não agir?" e perseverar até ver a glória de Deus.\n\n4. JEJUM E ORAÇÃO COMO ALINHAMENTO COM A VONTADE DE DEUS\nO sacrifício do jejum acompanhado de arrependimento genuíno, abandono da hipocrisia e perdão (como Ester por 3 dias e Daniel por 21 dias) não serve para comprar a Deus, mas para quebrantar o nosso interior e nos alinhar perfeitamente à vontade soberana do Senhor.`,
      videoUrl: "http://www.youtube.com/watch?v=PToM1532YMo",
      thumbnailUrl: OFFICIAL_PHOTOS.pulpitPreaching,
      status: ApprovalStatus.PUBLISHED,
      isFeatured: true,
      isDemoData: false,
      authorId: pastorUser.id,
      approverId: pastorUser.id,
      approvedAt: new Date("2026-09-28T10:00:00Z"),
      publishedAt: new Date("2026-09-28T10:00:00Z"),
    },
  });

  await prisma.ministerialContent.upsert({
    where: { slug: "o-codigo-sagrado-crer-e-obedecer" },
    update: {},
    create: {
      slug: "o-codigo-sagrado-crer-e-obedecer",
      title: "O Código Sagrado: As Duas Chaves que Abrem Todas as Portas",
      subtitle: "Estudo Bíblico extraído da obra 'A Vida Que Deus Preparou Para Mim'",
      type: ContentType.BIBLE_STUDY,
      category: "Ensino Bíblico",
      biblicalReference: "João 10:9-10; Marcos 5:27; Lucas 17:12-14",
      summary:
        "A vida que Deus planejou para Seus filhos não se baseia em fórmulas complexas, mas na união inegociável de dois princípios: Crer na promessa e Obedecer à instrução divina, rompendo com a falsa resignação espiritual.",
      bodyText: `Muitos cristãos complicam o que Deus simplificou. Se observarmos a trajetória de cada herói da fé nas Escrituras, veremos que todos operaram sob duas chaves: Crer e Obedecer.\n\n1. A QUEBRA DA FALSA RESIGNAÇÃO ESPIRITUAL\nQuando o sofrimento se prolonga — como os 12 anos da mulher do fluxo de sangue (Marcos 5:27) — surge o perigo do conformismo disfarçado de piedade ("se Deus quiser Ele faz, se não quiser, amém"). Isso não é submissão à soberania de Deus, mas rendição prematura. A fé que ouve a Palavra gera movimento, nunca estagnação (Romanos 10:17).\n\n2. A SINERGIA ENTRE CRER E OBEDECER\nOs dez leprosos (Lucas 17:12-14) foram purificados no caminho, enquanto obedeciam à ordem de Jesus ("Ide, e mostrai-vos aos sacerdotes"). Se você Crer, mas não Obedecer, sua fé será teórica e sem frutos. Se você Obedecer, mas não Crer, sua religiosidade será um fardo sem alegria. Quando você une o Crer e o Obedecer, entra no centro da vontade de Deus.`,
      thumbnailUrl: OFFICIAL_PHOTOS.altarMinistry,
      status: ApprovalStatus.PUBLISHED,
      isFeatured: true,
      isDemoData: false,
      authorId: pastorUser.id,
      approverId: pastorUser.id,
      approvedAt: new Date("2026-10-15T10:00:00Z"),
      publishedAt: new Date("2026-10-15T10:00:00Z"),
    },
  });

  await prisma.ministerialContent.upsert({
    where: { slug: "como-permanecer-navegando-no-meio-do-vendaval" },
    update: {},
    create: {
      slug: "como-permanecer-navegando-no-meio-do-vendaval",
      title: "Como Permanecer Navegando no Meio do Vendaval e do Silêncio de Deus",
      subtitle: "Princípios forjados em 16 anos de experiência e milagre (1998–2014)",
      type: ContentType.ARTICLE,
      category: "Consolo e Perseverança",
      biblicalReference: "2 Coríntios 10:3-5; Lucas 6:38",
      summary:
        "Lições práticas sobre como manter o barco firme na Palavra, blindar os ouvidos contra a incredulidade, continuar cumprindo o chamado em meio à dor e compreender o propósito do silêncio de Deus.",
      bodyText: `Há momentos na caminhada cristã em que o vendaval se prolonga além das forças humanas. Ao longo dos 16 anos entre o diagnóstico severo em 1998 e a cura completa e sobrenatural que o Senhor me concedeu em 2014, aprendi quatro colunas inabaláveis:\n\n1. Firme o seu barco na Palavra, não nas circunstâncias: A circunstância é temporária, mas a Palavra de Deus é eterna.\n2. Proteja os seus ouvidos e blinde a sua mente: O medo é altamente contagioso; feche os ouvidos para relatórios de incredulidade.\n3. Cumpra o seu chamado mesmo carregando a dor: É no movimento da obediência que o sobrenatural se manifesta.\n4. Troque o "Por quê?" pelo "Para quê?": O silêncio de Deus não é rejeição, é o laboratório do Espírito Santo onde o caráter é forjado e o testemunho é preparado para edificar milhares de vidas.`,
      thumbnailUrl: OFFICIAL_PHOTOS.portrait,
      status: ApprovalStatus.PUBLISHED,
      isFeatured: false,
      isDemoData: false,
      authorId: pastorUser.id,
      approverId: pastorUser.id,
      approvedAt: new Date("2026-10-20T10:00:00Z"),
      publishedAt: new Date("2026-10-20T10:00:00Z"),
    },
  });

  console.log("Acervo Real do Pastor Geraldo Afonso sincronizado com sucesso!", {
    pastor: pastorUser.name,
    admin: adminUser.email,
  });
}

main()
  .catch((e) => {
    console.error("Erro ao sincronizar seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });