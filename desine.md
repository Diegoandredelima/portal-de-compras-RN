# Manual de Design e Diretrizes de UI/UX - Portal de Compras do RN (`desine.md`)

Este documento consolida o **Design System**, os tokens visuais, a arquitetura de informação e os padrões de interface do usuário (UI) e experiência do usuário (UX) aplicados ao **Portal de Compras Governamentais do Estado do Rio Grande do Norte**.

---

## 1. Identidade Visual e Filosofia de Design

O Portal de Compras do RN representa a face digital das aquisições e contratações públicas do Estado. O projeto foi desenhado sob a governança da **Secretaria de Estado da Administração (SEAD)** e da **Coordenadoria de Compras Governamentais (COMPR)**, adotando os princípios fundamentais da administração pública digital:

1. **Transparência e Clareza:** Informação orçamentária, licitatória e normativa acessível para qualquer cidadão, com visualização gráfica descomplicada.
2. **Eficiência e Acesso Democrático:** Redução de barreiras de entrada para Micro e Pequenas Empresas (ME/EPP) e MEIs participarem de compras públicas.
3. **Consistência Institucional:** Alinhamento rigoroso com as diretrizes do **GovBR Design System (Padrão Digital de Governo)** e as marcas oficiais do Governo do Estado do Rio Grande do Norte.
4. **Acessibilidade Universal:** Conformidade com o Modelo de Acessibilidade em Governo Eletrônico (**e-MAG**) e padrão internacional **WCAG 2.1 nível AA**.

---

## 2. Paleta de Cores e Tokens de Cor

A paleta de cores combina a sobriedade institucional da gestão pública com tons energéticos de ação e destaque.

### 2.1 Cores Principais

| Nome do Token | Valor Hex | Amostra | Aplicação / Semântica |
| :--- | :--- | :--- | :--- |
| `--primary-color` | `#1351B4` | 🟦 Azul Gov.br | Cor primária institucional, títulos de destaque, links e bordas ativas |
| `--dark-blue` | `#071D41` | ⬛ Azul Escuro Noturno | Cabeçalho superior, copyright, contrastes fortes de texto |
| `--main-blue` | `#3A6A85` | 🟦 Azul Petróleo | Fundo do rodapé institucional (footer), botões outline |
| `--secondary-color` | `#FF6B35` | 🟧 Laranja Destaque | Ações secundárias, badges de alerta suave, primeiro tom da color-bar |
| `--primary-button` | `#D34C2B` | 🟥 Laranja Queimado | Botões de ação primária (CTA principal), chamadas de conversão |
| `--orange-hover` | `#B03C1F` | 🟫 Laranja Escuro | Estado `:hover` e `:active` dos botões primários |
| `--success-color` | `#5EA51D` | 🟩 Verde Transparência | Cards de indicadores de compras homologadas, badges de sucesso |
| `--warning-color` | `#FFCD07` | 🟨 Amarelo RN | Alertas, avisos de prazos, ícones informativos e detalhes no rodapé |
| `--info-color` | `#3498db` | 🟦 Azul Céu | Notificações informativas, links secundários e badges de comunicação |

### 2.2 Cores Neutras e de Superfície

| Nome do Token | Valor Hex | Aplicação |
| :--- | :--- | :--- |
| `--light-grey-bg` | `#F5F5F5` | Fundo de campos de formulário e inputs de busca |
| `--lighter-grey-bg` | `#F8F9FA` | Fundo do cabeçalho institucional superior e seções alternadas |
| `--border-grey` | `#E9E9E9` | Bordas sutis de cards, divisórias e separadores de conteúdo |
| `--font-color` | `#333333` | Cor padrão de leitura para textos corridos e parágrafos |
| `--light-blue-bg` | `#EEF4FF` | Fundo de destaque para caixas de dicas e notas contextuais |
| `--light-blue-border`| `#CAD9F0` | Borda delimitadora para caixas azuis de contexto |

### 2.3 A Faixa Multicolorida Institucional (`.color-bar`)

Elemento de assinatura visual presente em todas as páginas, posicionada imediatamente abaixo do topo institucional:

```css
.color-bar {
    height: 4px;
    background: linear-gradient(90deg, 
        #FF6B35 0%, #FF6B35 25%,   /* Laranja: 0 a 25% */
        #5EA51D 25%, #5EA51D 50%,  /* Verde: 25 a 50% */
        #FFCD07 50%, #FFCD07 75%,  /* Amarelo: 50 a 75% */
        #3498db 75%, #3498db 100%  /* Azul: 75 a 100% */
    );
}
```

---

## 3. Tipografia

A tipografia do portal segue o padrão oficial da identidade digital do Governo Federal e Estadual, utilizando a família de fontes **Rawline**.

### 3.1 Família e Carregamento

```css
@font-face {
    font-family: 'Rawline';
    src: url('../fonts/rawline/rawline-400.woff2') format('woff2');
    font-weight: 400; /* Regular */
}
@font-face {
    font-family: 'Rawline';
    src: url('../fonts/rawline/rawline-500.woff2') format('woff2');
    font-weight: 500; /* Medium */
}
@font-face {
    font-family: 'Rawline';
    src: url('../fonts/rawline/rawline-600.woff2') format('woff2');
    font-weight: 600; /* Semi-Bold */
}
```

**Font Stack de Fallback:**
`font-family: 'Rawline', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;`

### 3.2 Escala Tipográfica e Hierarquia

| Nível | Tamanho | Peso | Linha (`line-height`) | Uso |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | 36px - 44px | 700 / 800 | 1.2 | Títulos principais de páginas e destaques centrais |
| **Título de Seção H2** | 28px - 32px | 700 | 1.3 | Divisões temáticas principais (`.section-title`) |
| **Subtítulo H3** | 20px - 24px | 600 | 1.4 | Títulos de blocos, cartões e categorias |
| **Cabeçalho de Card H4** | 18px - 20px | 600 | 1.4 | Nomes de ferramentas, serviços da SEAD e tópicos |
| **Corpo (Body / Regular)** | 16px | 400 | 1.6 | Textos explicativos, parágrafos e orientações |
| **Corpo Pequeno / Meta** | 14px | 400 / 500 | 1.5 | Datas, autorias, rodapé e links secundários do topo |
| **Legendas / Badges** | 12px | 600 | 1.4 | Etiquetas de categorias (`badge-info`, `badge-success`) |

---

## 4. Grid, Espaçamento e Responsividade

O layout é construído com base em uma grade fluida de 12 colunas, compatível com o grid utilitário do Tailwind CSS.

### 4.1 Pontos de Interrupção (Breakpoints)

- **Mobile:** `< 640px` (Stack vertical, menu hambúrguer ativado, carrossel em slide único)
- **Tablet:** `640px` a `1024px` (Grid de 2 colunas para cards, busca redimensionada)
- **Desktop:** `> 1024px` (Grid completa de 3 a 5 colunas, menus expandidos)
- **Largura Máxima do Conteúdo:** `max-w-7xl` (1280px centralizado com `mx-auto`)

### 4.2 Sistema de Espaçamento Base (Múltiplos de 4px / 8px)
- **Padding de Seções:** `py-12` a `py-16` (48px a 64px) para respiro visual
- **Gap entre Cards:** `gap-6` ou `gap-8` (24px a 32px)
- **Border Radius Padrão:**
  - Cards e caixas: `rounded-lg` (8px) a `rounded-xl` (12px)
  - Botões pílula: `rounded-2xl` ou `rounded-full` (20px a 9999px)
  - Inputs de busca: `rounded-full` (20px)

---

## 5. Biblioteca de Componentes da Interface

### 5.1 Barra Superior Institucional (Header Superior)
- **Fundo:** `#F8F9FA`
- **Conteúdo à esquerda:** Logotipos oficiais da COMPR (`h-12`) e da SEAD/Governo do RN.
- **Conteúdo à direita:** Links transparentes para serviços governamentais (Portal da Transparência, Ouvidoria, Assédio Não!, Acesso à Informação, POLI) e ícones de redes sociais.

### 5.2 Barra de Navegação Fixa (`.sticky-header`)
- Permanece no topo durante a rolagem (`position: sticky; top: 0; z-index: 1000;`).
- Inclui botão de menu off-canvas à esquerda, título da aplicação ("Central de Compras") e barra de busca integrada com botão de **"Acesso ao Sistema"** destacado em azul marinho.

### 5.3 Menu Lateral Off-Canvas (`.offcanvas-menu`)
- Painel deslizante à esquerda com largura de `280px` a `320px`.
- Acompanhado por backdrop semi-transparente escurecido (`.offcanvas-backdrop`).
- Lista com ícones coloridos para cada área do portal (Fornecedor, Servidor, Cidadão, Capacite-se, Legislação, Oportunidades, FAQ, Fórum).

### 5.4 Carrossel Governamental (`BrCarousel`)
- Baseado nas diretrizes do GovBR DS com adaptações visuais do Estado.
- Controles:
  - Setas laterais anteriores/próximas (`.br-carousel__btn`)
  - Botão de Play/Pause para respeito aos critérios de acessibilidade (movimento pausável)
  - Indicadores em círculos clicáveis na base

### 5.5 Painel de Ações Rápidas por Perfil
- Três perfis bem demarcados:
  1. **Fornecedor:** Foco em SICAF, editais e manuais.
  2. **Servidor:** Ferramentas SEI, SUAP, capacitação e compras diretas.
  3. **Cidadão:** Acesso à transparência pública, relatórios e controle social.

### 5.6 Painel de Indicadores e Gráficos (Dashboard)
- **Cards de Métricas:** Fundo verde `#5EA51D`, texto em branco de alto contraste, tipografia de grande impacto (ex: "R$ 31.4bi", "11 mil processos"). Efeito hover suave `hover:scale-105`.
- **Gráficos Integrados (Chart.js):**
  - Gráfico de Linha: Evolução mensal de compras homologadas.
  - Gráficos de Barra: Top 5 maiores compradores estaduais e setores com maior volume.
  - Gráfico de Rosca (Donut): Caronas mais requisitadas.

### 5.7 Fórum de Discussão Comunitário
- Sistema de tópicos com listagem filtrável por categoria (Legislação, Planejamento, Modalidades, Gestão, etc.).
- Botões de interação com contagem de curtidas, descurtidas e número de comentários.
- Sistema de feedback visual com alertas Toast.

### 5.8 Rodapé Institucional (Mega-Footer)
- Fundo em tom azul institucional escuro (`#3A6A85`).
- Grid de 5 colunas com mapa completo do site:
  1. Institucional
  2. Acesso
  3. Oportunidades
  4. Conhecimento
  5. Serviços SEAD
- Faixa inferior separada em `#071D41` com copyright oficial e link de política de privacidade.

---

## 6. Acessibilidade e Boas Práticas (WCAG 2.1 AA)

1. **Relação de Contraste:** Todo texto deve manter contraste mínimo de **4.5:1** contra sua cor de fundo (ou **3:1** para textos grandes acima de 24px).
2. **Navegação por Teclado:** Elementos focáveis (`<a>`, `<button>`, `<input>`) devem exibir anel de foco visível (`focus:outline` ou `focus:ring-2`).
3. **Animações e Movimento:** Respeitar a preferência do usuário `prefers-reduced-motion` para evitar transições que possam causar desconforto visual.
4. **Leitores de Tela:** Utilizar landmarks semânticos (`role="region"`, `aria-label`, `aria-expanded`, `aria-controls` nos acordeões e menus).
