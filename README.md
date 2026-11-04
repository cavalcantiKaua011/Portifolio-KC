# Portfólio de Kauã Cavalcanti (v3)

Site estático de página única: HTML, CSS e JavaScript puro, sem build. A versão anterior está em `../references/portfolio-v2-original.zip`.

## Estrutura

```
index.html         Estrutura, SEO, CSP, JSON-LD e fallback sem JavaScript
css/style.css      Tokens de cor no :root e componentes
js/content.js      Conteúdo PÚBLICO: só entra o que foi confirmado
js/drafts.js       Rascunhos e pendências. Só carrega com ?edit=1
js/main.js         Renderização, modal, menu, animações, WhatsApp e modo edição
images/            Fotos e favicon. images/_rascunhos não vai para o ar
.vercelignore      Exclui js/drafts.js, images/_rascunhos e este README do deploy
```

## Ver localmente

Na pasta do site, rode `npx serve .` ou `python -m http.server`, e abra o endereço indicado. Abrir o arquivo direto no navegador pode funcionar parcialmente.

- **Versão pública:** `/`
- **Modo de edição:** `/?edit=1`, mostra rascunhos e pendências, com aviso na tela.

## Editar

- **Texto, contatos, projetos e serviços:** `js/content.js`.
- **Promover um rascunho:** mova o item de `js/drafts.js` para `js/content.js` depois de validar.
- **Fotos reais da placa:** preencha `assets.products` em `js/content.js`.
- **Indicadores:** só em `about.metrics`, depois de validar. Com a lista vazia, a faixa não aparece.

## Antes do deploy

1. **Autorização sua.** Nada foi publicado.
2. Se não usar a Vercel, reproduza as exclusões do `.vercelignore`. Sem isso, `drafts.js` fica acessível por URL direta.
3. Com o domínio definido, adicione `canonical` e troque a URL de `og:image` por uma absoluta.
4. Rode o Lighthouse, teste em um celular real e abra os links de WhatsApp.

Testes, resultados e limites: `../strategy/portfolio-audit.md`.
