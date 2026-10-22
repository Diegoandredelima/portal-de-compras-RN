# Manual Operacional do Agente de IA - Portal de Compras do RN (`agent.md`)

Este documento (`agent.md`) é a diretriz mestre e o manual de operações para **agentes de Inteligência Artificial autônomos** que executam tarefas de análise, refatoração, desenvolvimento e integração no repositório do **Portal de Compras Governamentais do Rio Grande do Norte**.

---

## 1. Missão e Perfil do Agente

- **Papel:** Arquiteto de Software Frontend & Especialista em Portais Governamentais Acessíveis.
- **Objetivo Principal:** Manter a integridade visual institucional, garantir a conformidade de acessibilidade (WCAG 2.1 AA / e-MAG), modernizar a arquitetura frontend e preparar todo o ecossistema estático para conexão desacoplada com o repositório de backend futuro.
- **Mentalidade Operacional:** Precisão, não-destrutividade, preservação de regras de negócio públicas e entrega orientada a testes.

---

## 2. Diagnóstico Arquitetural da Aplicação

### 2.1 O Que o Projeto É
- Uma aplicação frontend Jamstack puramente estática, sem etapa pesada de compilação ou bundler (dispensa Webpack, Vite ou Babel para execução básica).
- Dependências estilísticas e visuais carregadas via CDN e folhas locais:
  - **Tailwind CSS 2.2.19** via CDN
  - **Font Awesome 6.x** via CDN
  - **Chart.js** via CDN
  - **Rawline Font** servida localmente em `public/fonts/`
  - **@govbr-ds/core 3.6.2** instalado via npm em `node_modules`
- Conjunto de 14 páginas HTML em `public/pages/` e a raiz `public/index.html`.
- Simulação de funcionalidades dinâmicas através de Vanilla JavaScript com armazenamento em `localStorage` (fórum, notícias, gráficos e acordeões).
- Capacidade de Progressive Web App (PWA) habilitada via `manifest.json` e `service-worker.js`.

### 2.2 O Que o Projeto NÃO É (Ainda)
- Não possui backend conectado em produção (o marcador `backend-wordpress` está vazio).
- Não possui autenticação real de usuários (os botões de login e acesso ao sistema são redirecionamentos ou modais simulados).
- Não consome dados em tempo real do PNCP (Portal Nacional de Contratações Públicas) ou da base de dados da SEAD.

---

## 3. Mapa Detalhado de Responsabilidade dos Arquivos

| Arquivo / Diretório | Responsabilidade Principal | Cuidados Críticos para o Agente |
| :--- | :--- | :--- |
| `public/index.html` | Página principal com carrossel, atalhos, indicadores de compras e mapa de serviços | Ponto focal do portal; zelar pelos scripts de inicialização de `Chart.js` |
| `public/pages/fornecedor.html` | Orientações de credenciamento SICAF e Compras.gov.br para fornecedores | Contém links governamentais externos sensíveis |
| `public/pages/servidor.html` | Hub de ferramentas operacionais dos servidores (SEI, SUAP, SIPAC) | Manter alinhamento com a identidade SEAD |
| `public/pages/cidadao.html` | Página de transparência pública e integração conceitual com PNCP e BI | Contém links de referência para Power BI |
| `public/pages/oportunidade.html` | Central de processos de compra, dispensas e oportunidades ME/EPP | Possui CSS próprio (`oportunidade.css`) e JS específico |
| `public/pages/legislacao.html` | Catálogo de leis (Lei 14.133), decretos estaduais e portarias do RN | Estrutura densa de texto; preservar hierarquia de títulos |
| `public/pages/forum.html` | Fórum de debate comunitário entre servidores e fornecedores | Conectado a `public/js/forum.js` (gerencia curtidas e tópicos) |
| `public/pages/noticias.html` | Central de matérias e comunicados governamentais | Conectado a `public/js/news-script.js` |
| `public/pages/manuais.html` | Download de guias práticos, cartilhas e manuais em PDF | Referencia arquivos da pasta `/Arquivos` |
| `public/pages/capacite-se.html` | Cursos, workshops e capacitações da Escola de Governo do RN | Manter cards informativos padronizados |
| `public/pages/faqs-perguntas.html`| Perguntas Frequentes categorizadas por tema | Conectado a `public/js/fAQs.js` |
| `public/pages/institucional.html` | Informações sobre a COMPR, SEAD, estrutura e missão | Conteúdo estático de alta fidelidade |
| `public/pages/acesso-sistema.html`| Portal de entrada para os sistemas de compras | **Atenção:** Contém código duplicado/quebrado que precisa de limpeza |
| `public/pages/compr-ia.html` | Assistente inteligente em desenvolvimento | Página com estilos em `compraia.css` |
| `public/pages/em-construcao.html`| Tela amigável de fallback para recursos não lançados | Não alterar o redirect de retorno |
| `public/js/scripts.js` | Menu lateral off-canvas, componente BrCarousel e utilitários globais | Não sobrescrever funções sem manter retrocompatibilidade |
| `public/js/grafico.js` | Instanciação e controle de gráficos Chart.js | Assegurar destruição de instâncias anteriores antes de recriar |
| `service-worker.js` | Cache offline e controle do PWA | **Atenção:** Requer correção de sensibilidade de caixa de nomes de arquivos |
| `config.json` | Configurações centrais, URLs de contato e redes sociais | Utilizar como ponto de partida para dados institucionais |

---

## 4. Plano de Ação Imediato: Resolução de Débitos Técnicos (Top Fixes)

Antes de qualquer adição de novos módulos ou conexão de backend, o agente deve priorizar a resolução dos débitos abaixo:

### Tarefa 1: Unificação de Caixa em Links e no Service Worker
- **Problema:** Existem divergências de maiúsculas/minúsculas entre o sistema de arquivos local (Windows não diferencia) e servidores de produção (Linux/Git/GitHub Pages que diferenciam).
- **Ação:**
  - Em `service-worker.js`, alterar `/Index.html`, `/pages/Servidor.html`, `/pages/Capacite-se.html`, etc., para seus nomes 100% minúsculos (`/index.html`, `/pages/servidor.html`, etc.).
  - Em `public/js/search.js`, corrigir o array `pagesToSearch` para utilizar caminhos reais em minúsculas e remover páginas inexistentes (como `pages/Artigos.html`).

### Tarefa 2: Higienização de `public/pages/acesso-sistema.html`
- **Problema:** O arquivo encerra a tag `</html>` na linha 12 com um redirecionamento automático, mas mantém mais de 70 linhas de template HTML órfão após o fechamento.
- **Ação:** Refatorar a página para exibir uma interface limpa de autenticação governamental (hub de login para Servidores, Fornecedores e Cidadãos com suporte a Login Gov.br), ou transformar em redirect limpo e documentado.

### Tarefa 3: Correção do Carregamento de `@govbr-ds/core`
- **Problema:** `cidadao.html` e `servidor.html` chamam `<link rel="stylesheet" href="../node_modules/@govbr-ds/core/dist/core.min.css">`. Quando o servidor é iniciado apontando para `public` (`serve public`), a pasta `node_modules` fica inacessível (HTTP 404).
- **Ação:** Copiar os assets estritamente necessários para `public/css/vendor/` ou consolidar os estilos no `public/css/main.css`.

### Tarefa 4: Correção de Caminho de Imagem no Rodapé de `index.html`
- **Problema:** A linha 465 de `public/index.html` referencia `../public/images/logos/NEGATIVO.png`. Na raiz, deve ser simplesmente `images/logos/NEGATIVO.png`.

---

## 5. Roteiro e Estratégia de Conexão com o Backend

O usuário possui outro repositório que será acoplado no futuro (ex: WordPress REST API, Node.js, FastAPI, Go, etc.). O agente deve preparar a arquitetura de dados segundo os seguintes passos:

### 5.1 Criação da Camada de Serviços (`public/js/services/`)
O agente deve estruturar a camada de comunicação assíncrona:

```
public/js/
├── services/
│   ├── api.js             # Cliente HTTP base (Fetch API com interceptors)
│   ├── newsService.js     # Obtenção de notícias e comunicados
│   ├── forumService.js    # Gerenciamento de tópicos e comentários
│   ├── faqService.js      # Listagem de FAQs dinâmicos
│   ├── statsService.js    # Dados de compras homologadas e gráficos
│   └── authService.js     # Gerenciamento de sessão e tokens
```

### 5.2 Padrão de Fallback Híbrido (Resiliência)
Durante a fase de transição, os serviços devem tentar consumir o backend; caso a chamada falhe (backend offline ou repositório não iniciado), devem carregar os dados simulados locais automaticamente:

```javascript
// Exemplo de padrão resiliente para o agente adotar
export async function getNews() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) throw new Error('Falha no servidor');
        return await response.json();
    } catch (error) {
        console.warn('Backend indisponível. Carregando dados estáticos de fallback.', error);
        return newsDataFallback;
    }
}
```

### 5.3 Contratos de Dados Esperados

1. **Notícias / Comunicados:**
   - `id`: number/string
   - `title`: string
   - `slug`: string
   - `excerpt`: string
   - `content`: string (HTML seguro)
   - `category`: 'noticia' | 'comunicado' | 'evento' | 'legislacao'
   - `featured_image`: string (URL)
   - `date`: string (ISO 8601)
   - `author`: string
2. **Fórum Comunitário:**
   - `id`: number
   - `category`: string (chave de categoria)
   - `title`: string
   - `description`: string
   - `date`: string
   - `likes`: number
   - `dislikes`: number
   - `comments`: Array<{ author: string, text: string, date?: string }>
3. **Indicadores de BI e Compras:**
   - `valor_homologado`: number
   - `valor_meepp`: number
   - `processos_homologados`: number
   - `fornecedores_participantes`: number
   - `mensal_compras`: Array<{ mes: string, valor: number }>
   - `top_compradores`: Array<{ nome: string, valor: number }>
   - `top_setores`: Array<{ nome: string, valor: number }>

---

## 6. Regras de Ouro e Checklist para o Agente

Ao realizar qualquer alteração no código deste projeto:

- [ ] **Preservar a Consistência de Todas as Páginas:** O portal possui 14 páginas que compartilham o mesmo header superior, a mesma `.color-bar`, o mesmo `.sticky-header` e o mesmo `.footer`. Se você alterar um item global, sincronize todas as páginas ou planeje uma transição para template modular.
- [ ] **Não Quebrar Seletores de DOM:** Scripts em `public/js/` buscam elementos por IDs específicos (ex: `#menu-toggle`, `#offcanvas-menu`, `#offcanvas-backdrop`, `#lineChartCompras`). Nunca renomeie ou remova IDs de elementos sem atualizar os controladores JavaScript correspondentes.
- [ ] **Validar Linting e Formatação:** Execute sempre `npm run lint` e garanta que o código esteja formatado com `npm run format`.
- [ ] **Manter Foco em Acessibilidade:** Nunca crie botões ou ícones interativos sem atributo `aria-label` e título acessível.
- [ ] **Verificar Links e Rotas:** Certifique-se de que caminhos relativos em subpáginas utilizam `../` corretamente para voltar à raiz pública (`../css/`, `../images/`, `../index.html`).
