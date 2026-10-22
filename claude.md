# Guia de Desenvolvimento Claude - Portal de Compras Governamentais do RN

Este documento (`claude.md`) serve como guia de referência técnica, padrões de código e diretrizes de arquitetura para assistentes Claude e desenvolvedores atuando no **Portal de Compras Governamentais do Estado do Rio Grande do Norte**.

---

## 1. Visão Geral do Projeto

- **Nome:** Portal de Compras Governamentais do RN
- **Entidade Governamental:** Coordenadoria de Compras Governamentais (COMPR) / Secretaria de Estado da Administração (SEAD) / Governo do Estado do Rio Grande do Norte
- **Finalidade:** Centralizar serviços, oportunidades licitatórias, legislações, capacitações, transparência de dados e suporte para três perfis de usuários: **Fornecedores**, **Servidores Públicos** e **Cidadãos**.
- **Estado Atual:** Frontend Jamstack estático (HTML5, Tailwind CSS, Vanilla JavaScript ES6+, Chart.js, PWA com Service Worker) com mockups dinâmicos e persistência local, preparado para futura acoplagem a uma API de backend (WordPress Headless ou API REST proprietária).

---

## 2. Pilha Tecnológica e Ferramentas

| Camada / Função | Tecnologia / Biblioteca | Versão / Observação |
| :--- | :--- | :--- |
| **Estrutura** | HTML5 Semântico | Padrões e-MAG / WCAG 2.1 |
| **Estilização** | Tailwind CSS + CSS3 Customizado | Tailwind 2.2.19 via CDN + `public/css/main.css` |
| **Design System** | GovBR Design System (`@govbr-ds/core`) | 3.6.2 (Tokens e componentes visuais do GovBR) |
| **Ícones e Tipografia** | Font Awesome 6.x + Fonte Rawline | Ícones via CDN e fonte Rawline local em `public/fonts/` |
| **Lógica e Interatividade** | Vanilla JavaScript (ES6+) | Scripts modulares por domínio (`scripts.js`, `forum.js`, `grafico.js`, etc.) |
| **Gráficos e BI** | Chart.js | Utilizado no dashboard de dados de compras na Home |
| **PWA / Offline** | Service Worker + Web App Manifest | Cache local offline e instalação como aplicativo |
| **Linter & Formatador** | ESLint 8.56.0 + Prettier 3.2.5 | Configuração estrita para JS e HTML |
| **Servidor de Dev** | `serve` 14.2.1 | Servidor estático em porta 8080 |

---

## 3. Estrutura de Diretórios

```
portal-de-compras-RN-main/
├── .github/workflows/deploy.yml   # Workflow de CI/CD para deploy
├── Arquivos/                      # Documentos e manuais em PDF (ex: Guia Fornecedor SICAF)
├── Documentação/                  # Requisitos, protótipo original e especificações
├── public/                        # Raiz servida no ambiente web
│   ├── css/                       # Estilos modulares e tema base
│   │   ├── main.css               # Folha de estilo mestra e variáveis CSS
│   │   ├── carrossel.css          # Estilos do componente BrCarousel
│   │   ├── forum.css              # Estilos do fórum interativo
│   │   ├── news-styles.css        # Estilos da página de notícias
│   │   ├── oportunidade.css       # Estilos da área de oportunidades
│   │   ├── faqs-perguntas.css     # Estilos da central de perguntas
│   │   ├── institucional.css      # Estilos institucionais
│   │   ├── compraia.css           # Estilos para o assistente de IA
│   │   └── construction.css       # Estilos de páginas em manutenção
│   ├── fonts/                     # Fontes Rawline (400, 500, 600, 700)
│   ├── images/                    # Logotipos oficiais, banners, ilustrações
│   │   ├── logos/                 # SEAD, COMPR, Governo RN, Negativo
│   │   ├── Banner/                # Banners das páginas internas
│   │   └── imagem-noticia/        # Imagens das matérias e carrossel
│   ├── js/                        # Controladores JavaScript
│   │   ├── scripts.js             # Menu off-canvas, carrossel e utilitários globais
│   │   ├── forum.js               # Fórum, tópicos, curtidas, paginação e modais
│   │   ├── grafico.js             # Gráficos Chart.js (compras homologadas e caronas)
│   │   ├── news-script.js         # Filtros, busca e paginação de notícias
│   │   ├── fAQs.js                # Sistema de acordeão e temas de FAQ
│   │   ├── oportunidade.js        # Abas e filtros da página de oportunidades
│   │   ├── search.js              # Mecanismo de busca global no site
│   │   └── compr-ia.js            # Interatividades da página COMPR-IA
│   ├── pages/                     # Páginas HTML do portal (14 páginas)
│   │   ├── fornecedor.html        # Portal do fornecedor / SICAF
│   │   ├── servidor.html          # Portal do servidor público estadual
│   │   ├── cidadao.html           # Portal do cidadão e transparência PNCP
│   │   ├── oportunidade.html      # Editais, ME/EPP, dispensas e licitações
│   │   ├── legislacao.html        # Lei 14.133/2021, decretos e portarias do RN
│   │   ├── forum.html             # Fórum comunitário e discussões
│   │   ├── noticias.html          # Central de notícias e comunicados
│   │   ├── manuais.html           # Manuais, guias e orientações técnicas
│   │   ├── capacite-se.html       # Cursos e treinamentos da Escola de Governo
│   │   ├── faqs-perguntas.html    # Perguntas e respostas frequentes
│   │   ├── institucional.html     # Histórico, missão, organograma COMPR/SEAD
│   │   ├── acesso-sistema.html    # Hub de autenticação/acesso aos sistemas
│   │   ├── compr-ia.html          # Chatbot / Inteligência Artificial institucional
│   │   └── em-construcao.html     # Fallback amigável para módulos em obra
│   └── index.html                 # Página inicial do portal
├── backend-wordpress/             # Marcador / pasta para acoplamento do backend
├── config.json                    # Configurações institucionais e metadados
├── manifest.json                  # Manifesto PWA
├── service-worker.js              # Gerenciador de cache PWA
├── tailwind.config.js             # Configuração estendida de tema e plugins Tailwind
├── eslint.config.js               # Configuração ESLint Flat Config
├── .eslintrc.json                 # Configuração ESLint tradicional
├── .prettierrc                    # Regras de formatação de código
├── package.json                   # Dependências e scripts npm
└── README.md                      # Documentação introdutória do repositório
```

---

## 4. Comandos e Fluxo de Trabalho

Todos os comandos devem ser executados a partir do diretório raiz do projeto:

```bash
# 1. Instalação das dependências
npm install

# 2. Iniciar servidor local de desenvolvimento
npm run dev
# Alternativa sem live reload:
npm start
# O portal estará disponível em: http://localhost:8080

# 3. Verificação de qualidade de código (Linting)
npm run lint

# 4. Correção automática de problemas no ESLint
npm run lint:fix

# 5. Formatação do código com Prettier
npm run format

# 6. Checagem de conformidade de formatação
npm run format:check
```

---

## 5. Diretrizes de Código e Padrões de Estilo

Ao gerar ou editar código neste projeto, Claude deve aderir rigorosamente às seguintes diretrizes:

### 5.1 HTML Semântico e Acessibilidade
1. **Estrutura Padrão:** Todo documento HTML deve possuir:
   - `<!DOCTYPE html>` e `<html lang="pt-BR">`
   - Metatags de `viewport`, `charset="UTF-8"` e descrição para SEO
   - Marcação semântica com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>` e `<footer>`
   - O cabeçalho superior institucional do Governo do RN, seguido pela barra multicolorida (`.color-bar`), pelo cabeçalho fixo com menu hambúrguer (`.sticky-header`) e pelo menu lateral off-canvas (`.offcanvas-menu`)
2. **Acessibilidade (WCAG 2.1 AA / e-MAG):**
   - Todos os botões e links icônicos devem conter atributos explicativos `aria-label` ou `aria-labelledby`.
   - Imagens devem possuir `alt` descritivo; imagens decorativas devem ter `alt=""`.
   - Modais e gavetas devem controlar o foco do teclado e bloquear scroll no `body` quando ativas.

### 5.2 Estilização e CSS
1. **Cores do Projeto:** Nunca invente novas cores hexadecimais aleatórias; utilize as variáveis declaradas em `public/css/main.css`:
   - `--primary-color: #1351B4` (Azul institucional)
   - `--secondary-color: #FF6B35` (Laranja de destaque/ação)
   - `--success-color: #5EA51D` (Verde confirmação/transparência)
   - `--warning-color: #FFCD07` (Amarelo atenção)
   - `--info-color: #3498db` (Azul claro complementar)
   - `--dark-blue: #071D41` (Azul marinho escuro)
2. **Tipografia:** A família oficial é `'Rawline'`, com fallbacks para fontes do sistema sans-serif.
3. **Consistência de Classes:** Mescle utilitários do Tailwind CSS (`flex`, `grid`, `p-4`, `shadow-md`, `rounded-lg`) com classes BEM e utilitários específicos do projeto (`.btn-primary`, `.btn-outline`, `.section-title`, `.card`).

### 5.3 JavaScript e Manipulação do DOM
1. **Isolamento de Escopo:** Todo script deve aguardar o carregamento do DOM via `document.addEventListener('DOMContentLoaded', () => { ... })` ou usar módulos ES.
2. **Tratamento Defensivo do DOM:** Antes de adicionar listeners ou manipular elementos, verifique sua existência:
   ```javascript
   const menuToggle = document.getElementById('menu-toggle');
   if (menuToggle) {
       menuToggle.addEventListener('click', toggleHandler);
   }
   ```
3. **Persistência de Mock:** Use `localStorage` com tratamento de erro (`try / catch`) para armazenar dados simulados (como interações do fórum ou curtidas).

---

## 6. Atenção Crítica: Débitos Técnicos e Correções Pendentes

Claude deve atentar para as seguintes inconsistências identificadas no repositório:

1. **Sensibilidade de Caixa em Nomes de Arquivo (Case-Sensitivity):**
   - Em sistemas operacionais Linux ou servidores de produção (Nginx, Apache, GitHub Pages), `Servidor.html` e `servidor.html` são caminhos distintos.
   - **Regra:** Todos os arquivos em `public/pages/` e `public/js/` devem ser referenciados em minúsculas (ex: `pages/servidor.html`, `pages/oportunidade.html`, `pages/forum.html`).
   - Ajustar ocorrências antigas em `service-worker.js` e `public/js/search.js` que utilizam maiúsculas.
2. **Dependência Quebrada de `@govbr-ds/core` em Subpáginas:**
   - As páginas `cidadao.html` e `servidor.html` contêm `<link rel="stylesheet" href="../node_modules/@govbr-ds/core/dist/core.min.css">`.
   - Ao rodar `serve public`, a pasta `node_modules` fica fora da raiz pública, gerando erro 404. Os estilos necessários devem ser consolidados em `public/css/main.css`.
3. **Markup residual em `public/pages/acesso-sistema.html`:**
   - O arquivo possui um redirect prematuro na linha 12 (`</html>`), mas o restante do template HTML permanece duplicado abaixo. É necessário limpar e padronizar.

---

## 7. Roteiro para Acoplamento com o Backend

O frontend foi desenvolvido com dados simulados em memória (`newsData` em `news-script.js`, `topics` em `forum.js`, `themes` em `fAQs.js`). Para conectar o repositório de backend futuro:

1. **Camada de Abstração de API (`public/js/services/api.js`):**
   - Criar um módulo central com métodos assíncronos (`fetchNews()`, `fetchTopics()`, `createTopic()`, `fetchOpportunities()`).
   - Implementar fallback gracioso: caso o backend esteja inacessível, utilizar os dados estáticos locais.
2. **Configuração de Endpoint Base:**
   - Utilizar a propriedade `site.url` de `config.json` ou uma variável de ambiente para alternar entre `http://localhost:8000/wp-json` e a URL de produção.
3. **Autenticação e SSO:**
   - Preparar os botões de "Acesso ao Sistema" para integração com Login Gov.br (OAuth2 / OpenID Connect) e autenticação SICAF/SEI.
