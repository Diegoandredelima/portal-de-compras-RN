# Portal de Compras Governamentais - RN

Bem-vindo ao repositório do **Portal de Compras Governamentais do Rio Grande do Norte**. Este projeto visa desenvolver um portal web moderno e acessível para facilitar o acesso a informações e serviços relacionados às compras públicas, promovendo transparência, eficiência e colaboração entre fornecedores, servidores e cidadãos.

## 🎯 Descrição do Projeto
O portal é uma plataforma centralizada que oferece suporte a diferentes perfis de usuários com funcionalidades específicas:

### 👥 Para Fornecedores
- Consulta de oportunidades de negócio
- Acesso a editais e documentos
- Fórum de discussão e networking
- Manuais e tutoriais especializados

### 🏛️ Para Servidores
- Ferramentas de gestão de compras
- Acesso a legislação atualizada
- Capacitação e treinamentos
- Dashboards e relatórios

### 🏠 Para Cidadãos
- Transparência em compras públicas
- Acompanhamento de licitações
- Informações institucionais
- Canal de comunicação

O projeto segue as diretrizes de acessibilidade (WCAG 2.1) e boas práticas para portais governamentais.

## 📁 Estrutura do Projeto
A estrutura de diretórios do projeto é organizada da seguinte forma:

```
portal-de-compras-RN/
├── public/                 # Arquivos estáticos do front-end
│   ├── css/               # Estilos CSS personalizados
│   │   └── main.css       # Arquivo principal de estilos
│   ├── fonts/             # Fontes utilizadas
│   ├── images/            # Imagens, ícones e recursos visuais
│   ├── js/                # Scripts JavaScript
│   │   ├── scripts.js     # Script principal
│   │   └── forum.js       # Funcionalidades do fórum
│   └── pages/             # Páginas HTML do portal
│       ├── Fornecedor.html
│       ├── Servidor.html
│       ├── Cidadao.html
│       ├── Forum.html
│       ├── Legislacao.html
│       ├── Oportunidade.html
│       ├── FAQs-perguntas.html
│       ├── Manuais.html
│       ├── Noticias.html
│       ├── Institucional.html
│       ├── Capacite-se.html
│       ├── Acesso-sistema.html
│       ├── Em-construcao.html
│       └── Compr-ia.html
├── backend-wordpress/      # Backend WordPress (planejado)
├── config.json            # Configurações do projeto
├── manifest.json          # Manifesto PWA
├── service-worker.js      # Service Worker para PWA
├── sitemap.xml           # Mapa do site
├── tailwind.config.js    # Configuração do Tailwind CSS
├── eslint.config.js      # Configuração do ESLint
├── .prettierrc           # Configuração do Prettier
├── package.json          # Dependências do Node.js
└── README.md             # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

### Front-end
- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilização avançada com Flexbox e Grid
- **Tailwind CSS**: Framework CSS utilitário para design responsivo
- **JavaScript ES6+**: Interatividade e funcionalidades dinâmicas
- **Font Awesome**: Biblioteca de ícones
- **PWA**: Progressive Web App com Service Worker

### Ferramentas de Desenvolvimento
- **Node.js**: Ambiente de execução JavaScript
- **ESLint**: Linter para qualidade de código JavaScript
- **Prettier**: Formatador de código
- **Git**: Controle de versão

### Backend (Planejado)
- **WordPress**: CMS para gerenciamento de conteúdo
- **PHP**: Linguagem de programação do WordPress
- **MySQL**: Banco de dados

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- Um navegador web moderno (Chrome, Firefox, Edge, Safari)
- **Git** para controle de versão

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/governo-rn/portal-de-compras-RN.git
   cd portal-de-compras-RN
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto localmente:**
   ```bash
   # Usando um servidor local simples
   npx http-server public -p 8080
   
   # Ou usando Live Server (se estiver no VS Code)
   # Clique com botão direito no Index.html > Open with Live Server
   ```

4. **Acesse o portal:**
   Abra seu navegador e vá para `http://localhost:8080`

### Scripts Disponíveis

```bash
# Executar linter (ESLint)
npm run lint

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar formatação
npm run format:check
```

### Passos para Executar
1. Clone o repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-repositorio/portal-compras-rn.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd portal-compras-rn
   ```
3. Abra o arquivo `public/Index.html` em um navegador **ou** inicie um servidor local:
   ```bash
   npx http-server public
   ```
4. Acesse o portal pelo endereço indicado (geralmente http://localhost:8080).

## Funcionalidades do Portal
- **Navegação Acessível**: Menu lateral off-canvas com suporte a dispositivos móveis
- **Páginas Específicas por Perfil**: Conteúdo personalizado para fornecedores, servidores e cidadãos
- **Capacitação**: Cursos e materiais educacionais na página "Capacite-se"
- **Legislação**: Links para documentos legais relevantes
- **Oportunidades**: Lista de processos de compra abertos
- **Manuais**: Guias práticos em formato de cards para download
- **Acessibilidade**: Estrutura semântica e suporte a leitores de tela

## Desenvolvimento e Colaboração
### Diretrizes
- **Planejamento**: Utilize o quadro de requisitos no workspace para gerenciar tarefas
- **Design**: Consulte wireframes e protótipos no quadro de Design e Prototipação
- **Desenvolvimento**: Divida as tarefas em front-end (HTML/CSS/JS) e back-end
- **Testes**: Registre planos de teste no quadro de Testes e Validação
- **Documentação**: Armazene manuais e relatórios no quadro de Documentação e Entrega

### Como Contribuir
1. Faça um fork do repositório
2. Crie uma branch para sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações com mensagens claras:
   ```bash
   git commit -m "Adiciona página de artigos"
   ```
4. Envie a branch para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request descrevendo as mudanças

## Próximos Passos

- Adicionar conteúdo dinâmico à página de "Artigos"
- Realizar testes de acessibilidade (WCAG 2.1)
- Criar diagramas UML para processos de compra no workspace

## ✨ Funcionalidades Implementadas

### 🎨 Interface e Experiência do Usuário
- ✅ Design responsivo com Tailwind CSS
- ✅ Menu off-canvas para navegação mobile
- ✅ Carrossel de notícias na página principal
- ✅ Breadcrumbs para navegação
- ✅ Ícones Font Awesome em toda a interface
- ✅ Animações e transições suaves

### 📱 Progressive Web App (PWA)
- ✅ Manifesto PWA configurado
- ✅ Service Worker para cache offline
- ✅ Ícones para instalação como app
- ✅ Otimizado para dispositivos móveis

### 💬 Fórum Interativo
- ✅ Sistema de tópicos e discussões
- ✅ Busca em tempo real
- ✅ Sistema de curtidas e favoritos
- ✅ Notificações toast
- ✅ Estatísticas dinâmicas
- ✅ 12 tópicos com discussões simuladas

### 📄 Páginas Especializadas
- ✅ **Fornecedor**: Oportunidades e recursos para empresas
- ✅ **Servidor**: Ferramentas e capacitação para servidores
- ✅ **Cidadão**: Transparência e informações públicas
- ✅ **Legislação**: Base legal de compras públicas
- ✅ **Manuais**: Tutoriais e documentação
- ✅ **Notícias**: Portal de informações atualizadas
- ✅ **Institucional**: Informações sobre o órgão
- ✅ **FAQs**: Perguntas frequentes
- ✅ **Capacite-se**: Cursos e treinamentos

### 🔧 Ferramentas de Desenvolvimento
- ✅ ESLint configurado para qualidade de código
- ✅ Prettier para formatação automática
- ✅ Scripts npm para desenvolvimento
- ✅ Estrutura de arquivos organizada
- ✅ Documentação completa

### 🚀 Próximas Funcionalidades (Planejadas)
- 🔄 Integração com WordPress
- 🔄 Sistema de autenticação
- 🔄 Dashboard administrativo
- 🔄 API para dados dinâmicos
- 🔄 Sistema de notificações push
- 🔄 Integração com sistemas governamentais

## 📞 Contato
Para dúvidas ou sugestões, entre em contato com a equipe de desenvolvimento:

- **Email:** diegoandre@yahoo.com.br
- **Telefone:** (84) 99167-6402

---

© 2024 Governo do Rio Grande do Norte. Todos os direitos reservados. 
