/* ==========================================================================
   Conteúdo público do site. Tudo aqui aparece para o visitante.
   Regra: só entra o que foi confirmado. O que ainda depende de validação fica
   em js/drafts.js, que só carrega em ?edit=1 e não deve ir para o ar.
   ========================================================================== */

window.SITE = {
  brand: {
    name: 'Kauã Cavalcanti',
    city: 'São Paulo, SP',
    now: 'Agora: plataforma NFC em validação',
    intro: 'Sites, sistemas, automações e soluções NFC para empreendedores e empresas. O ponto de partida é o problema do seu negócio, não a ferramenta.',
    availability: null
  },

  contact: {
    whatsappNumber: '5511966245235',
    whatsappLabel: '+55 11 96624-5235',
    whatsappMessage: 'Olá, Kauã! Conheci seu portfólio e gostaria de conversar sobre um projeto.',
    email: 'cavalcantikaua48@gmail.com',
    linkedin: 'https://www.linkedin.com/in/kakaoc/',
    github: 'https://github.com/cavalcantiKaua011',
    instagram: 'https://www.instagram.com/cavalcanti.dev/'
  },

  assets: {
    personal: {
      hero:  { src: 'images/pessoal/jaqueta-escada.webp', w: 818, h: 1024, alt: 'Kauã Cavalcanti sorrindo, de óculos e jaqueta de couro preta, encostado na parede de uma escada com corrimão laranja', position: '40% 22%' },
      about: { src: 'images/pessoal/retrato-sobre.webp', w: 704, h: 800, alt: 'Retrato de Kauã Cavalcanti sorrindo, de moletom cinza e jaqueta jeans', position: '50% 30%' }
    },
    products: {
      nfcProduct: null,
      nfcInPlace: null,
      nfcTap: null
    }
  },

  credibility: [
    { label: 'Formação', value: 'Análise e Desenvolvimento de Sistemas' },
    { label: 'Experiência', value: '+4 anos em ambiente corporativo de grande porte' },
    { label: 'Construindo', value: 'Sites, sistemas, automações e produtos NFC' }
  ],

  projects: [
    {
      id: 'placas-nfc',
      title: 'Placas NFC e QR',
      subtitle: 'Produto físico e plataforma de gestão',
      category: 'Produto próprio',
      status: 'andamento',
      featured: true,
      coverWord: 'NFC',
      cover: { src: 'images/projetos/placas-nfc.webp', w: 1280, h: 800, alt: 'Modelos das plaquinhas NFC e QR Code para avaliação no Google, Instagram e WhatsApp' },
      domain: null,
      summary: 'Placas que levam o cliente do balcão a um destino digital configurável, com uma plataforma de gestão e geração automática da arte de impressão.',
      problem: 'Encurtar o caminho entre o estabelecimento físico e um destino digital, como a página de avaliação no Google, sem exigir aplicativo.',
      solution: 'Plataforma para configurar destinos e gerenciar placas, com gerador automático da arte de impressão. Está em validação técnica e ainda não está em produção.',
      tech: ['Next.js', 'JSZip'],
      result: null,
      links: []
    },
    {
      id: 'portfolio',
      title: 'Este portfólio',
      subtitle: 'Site estático sem dependências',
      category: 'Site próprio',
      status: 'andamento',
      featured: false,
      cover: { src: 'images/projetos/portfolio.webp', w: 1280, h: 800, alt: 'Página inicial deste portfólio, com a frase "Eu não só falo de tecnologia. Construo coisas com ela."' },
      domain: null,
      summary: 'Um site leve, sem etapa de build, em que tudo o que é público passa por validação antes de aparecer.',
      problem: 'Apresentar projetos e soluções com clareza, sem publicar números ou classificações que ainda não foram confirmados.',
      solution: 'Conteúdo centralizado em um único arquivo e separado dos rascunhos, imagens otimizadas e testes de acessibilidade e de responsividade.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      result: null,
      links: []
    },
    {
      id: 'thais-macenna',
      title: 'Thais Macenna',
      subtitle: 'Arquitetura e Interiores',
      category: 'Site institucional',
      status: null,
      featured: false,
      cover: { src: 'images/projetos/thais-macenna.webp', w: 1131, h: 707, alt: 'Página inicial do site Thais Macenna Arquitetura e Interiores' },
      domain: null,
      summary: 'Site com apresentação de portfólio e pedido de orçamento para uma arquiteta.',
      problem: 'Apresentar o trabalho de uma arquiteta de forma profissional e facilitar o pedido de orçamento.',
      solution: 'Home editorial, portfólio filtrável, páginas de projeto com comparador antes e depois e formulário de orçamento com alternativa via WhatsApp.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
      result: null,
      links: []
    },
    {
      id: 'rota-horizonte',
      title: 'Rota Horizonte',
      subtitle: 'Sistema web para turismo de aventura',
      category: 'Sistema web',
      status: null,
      featured: false,
      cover: { src: 'images/projetos/rota-horizonte-sem-numeros.webp', w: 1024, h: 405, alt: 'Página inicial do Rota Horizonte com o título "Onde o Horizonte te transforma"' },
      domain: null,
      summary: 'Plataforma para uma operadora de trilhas e rapel: página de conversão, agenda de sessões, inscrição em etapas e painel de gestão.',
      problem: 'Centralizar divulgação, inscrições e operação de saídas de turismo de aventura.',
      solution: 'Landing page, calendário de sessões, inscrição em três etapas, área do participante e painel administrativo com checklist operacional.',
      tech: ['TypeScript', 'Hono', 'Cloudflare Pages', 'Cloudflare D1'],
      result: null,
      links: []
    }
    /* NOVO PROJETO: copie um bloco acima, cole aqui e troque os textos e a imagem. O carrossel se ajusta sozinho. */
  ],

  solutionsIntro: 'Nem todo problema precisa de um sistema, e nem todo negócio precisa começar pelo site. Primeiro entendo o contexto. Depois definimos o formato que faz sentido, do mais simples ao mais completo.',
  services: [
    {
      id: 'presenca',
      title: 'Presença digital',
      text: 'Para quando o negócio precisa ser encontrado, entendido e procurado.',
      fit: ['Landing pages', 'Sites institucionais', 'Portfólios profissionais'],
      cta: 'Conversar sobre um site',
      message: 'Olá, Kauã! Vi seu portfólio e quero conversar sobre um site ou uma landing page.'
    },
    {
      id: 'sistemas',
      title: 'Sistemas e aplicações',
      text: 'Para quando planilhas e mensagens soltas já não dão conta da operação.',
      fit: ['Aplicações web', 'Sistemas personalizados', 'Produtos digitais'],
      cta: 'Conversar sobre um sistema',
      message: 'Olá, Kauã! Vi seu portfólio e quero conversar sobre um sistema ou uma aplicação.'
    },
    {
      id: 'automacao',
      title: 'Automação e processos',
      text: 'Para quando a equipe repete à mão uma tarefa que poderia rodar sozinha.',
      fit: ['Automações', 'Integrações', 'Processos digitais', 'Consultoria'],
      cta: 'Conversar sobre um processo',
      message: 'Olá, Kauã! Vi seu portfólio e quero conversar sobre automatizar um processo do meu negócio.'
    },
    {
      id: 'fisico',
      title: 'Do balcão ao digital',
      text: 'Para quando o primeiro passo cabe em cima do balcão.',
      fit: ['Placas NFC', 'Avaliações no Google', 'Cardápios digitais'],
      cta: 'Conversar sobre NFC',
      message: 'Olá, Kauã! Vi seu portfólio e quero saber mais sobre as placas NFC.'
    }
  ],
  solutionsNote: 'Cada conversa começa pelo escopo e pela viabilidade, antes de qualquer proposta.',

  process: [
    { title: 'Entender', text: 'O negócio, o público e o problema.' },
    { title: 'Definir', text: 'A solução e o escopo.' },
    { title: 'Construir', text: 'Desenvolver e validar.' },
    { title: 'Entregar', text: 'Publicar e orientar o uso.' }
  ],

  about: {
    lead: 'Aprendi que tecnologia só vale quando resolve o problema de alguém.',
    paragraphs: [
      'Tenho 21 anos, moro em São Paulo e estudo Análise e Desenvolvimento de Sistemas. Em ambiente corporativo, trabalho entre sistemas, dados e processos, fazendo a ponte entre quem precisa e quem constrói.',
      'Em paralelo, levo essa lógica para os meus próprios projetos: sites, sistemas, automações e um produto físico com NFC. Nem tudo está pronto, e eu prefiro dizer exatamente em que pé cada coisa está.'
    ],
    metrics: [
      { value: '4+', label: 'anos de experiência', caption: 'em ambiente corporativo de grande porte, em sistemas, dados e processos.' },
      { value: '5 mil+', label: 'usuários', caption: 'em sistema administrado por mim.' },
      { value: '20+', label: 'dashboards e relatórios', caption: 'executivos em Power BI e Excel.' },
      { value: '6', label: 'páginas web internas', caption: 'e componentes desenvolvidos em HTML e CSS.' }
    ],
    metricsNote: 'Indicadores referentes à atuação em ambiente corporativo.',
    education: 'Análise e Desenvolvimento de Sistemas',
    toolkit: ['HTML5', 'CSS3', 'JavaScript', 'Next.js', 'Python', 'SQL', 'Power BI', 'n8n', 'Mapeamento de processos', 'Levantamento de requisitos']
  },

  diary: {
    title: 'A vida <em>antes</em> do resultado.',
    text: 'Os bastidores ficam no Instagram: o que estou construindo, o que quebrou no caminho e a vida no meio disso tudo.',
    cta: 'Acompanhar no Instagram'
  },

  nfc: {
    enabled: true,
    title: 'O primeiro passo pode caber no balcão.',
    lead: 'Uma placa NFC conecta o espaço físico do seu negócio a um destino digital, como a página de avaliação no Google. É uma solução simples e um bom começo de conversa sobre o que mais pode melhorar.',
    steps: [
      { title: 'Aproximação', text: 'O cliente aproxima um celular compatível com NFC da placa.' },
      { title: 'Leitura', text: 'O celular reconhece o link gravado, sem precisar de aplicativo.' },
      { title: 'Destino', text: 'Abre a página configurada, como a avaliação do seu negócio no Google.' }
    ],
    note: 'Facilita o acesso. Avaliar continua sendo uma escolha do cliente.',
    cta: 'Conversar sobre a placa NFC',
    message: 'Olá, Kauã! Vi seu portfólio e quero saber mais sobre a placa NFC para avaliações no Google.'
  },

  testimonials: []
};
