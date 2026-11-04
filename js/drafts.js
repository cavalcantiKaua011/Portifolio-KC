/* ==========================================================================
   RASCUNHOS: não vão para o ar.
   Este arquivo e a pasta images/_rascunhos só são usados em index.html?edit=1.
   Para aprovar um item: resolva a pendência, mova o objeto para js/content.js
   e mova a imagem para images/projetos/.
   ========================================================================== */

window.SITE_DRAFTS = {
  projects: [
    {
      id: 'centro-conhecimento-normativo',
      title: 'Centro de Conhecimento Normativo',
      subtitle: 'Aplicação web de gestão do conhecimento',
      category: 'Aplicação web',
      status: null,
      cover: { src: 'images/_rascunhos/centro-conhecimento-normativo.webp', w: 1024, h: 489, alt: 'Tela administrativa com cards de normas como LGPD, NR-10 e ISO 9001' },
      domain: null,
      summary: 'Aplicação para cadastrar, relacionar e publicar normas e processos, com área administrativa e página de consulta separadas.',
      problem: 'Informações normativas dispersas e manutenção manual de páginas a cada alteração.',
      solution: 'Cadastro, documentos, histórico e busca, com exportação em uma estrutura de dados única para a página de consulta.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'localStorage'],
      result: null,
      links: [],
      pending: [
        'Autorização do contexto corporativo',
        'Menção à plataforma corporativa removida do texto, mas o README do repositório público a cita'
      ]
    }
  ],
  metrics: [
    { value: '10+', label: 'processos automatizados', caption: 'rotinas manuais digitalizadas. Sem confirmação.' }
  ],
  pending: {
    about: ['Biografia final', 'Instituição e previsão de formatura, retiradas até a validação', 'Toolkit: Python, SQL, Power BI e n8n vêm do currículo; confirmar'],
    nfc: ['Fotos do produto, da aplicação no estabelecimento e do uso com celular', 'Formato e personalização do produto', 'QR Code no produto final', 'Disponibilidade comercial'],
    availability: 'Selo "Disponível para novos projetos" retirado até a confirmação'
  }
};
